<?php

// // Header (won't  work on CLI)
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST');
// header("Access-Control-Allow-Headers: X-Requested-With");

/* array_from_worksheet_table()
 * Generate an array from an XML Worksheet
 * $file needs to be the full path to your file (e.g., '/Users/jeremy/www/cms/files/yourfile.xml')
 * $worksheet_name = the name of the worksheet tab
 */
function array_from_worksheet_table($file, $worksheet_name) {

  // https://stackoverflow.com/questions/7082401/avoid-domdocument-xml-warnings-in-php
  $previous_errors = libxml_use_internal_errors(true);

  $dom = new DOMDocument;
  if( !$dom->load($file) ) {
    foreach (libxml_get_errors() as $error) {
      // print_r($error);
    }
  }

  libxml_clear_errors();
  libxml_use_internal_errors($previous_errors);


  // returns a new instance of class DOMNodeList
  $worksheets = $dom->getElementsByTagName( 'Worksheet' );

  foreach($worksheets as $worksheet) {
    if( $worksheet->getAttribute('ss:Name') == $worksheet_name) {

      // When we get a DOMNodeList, if we want to access the first item, we have to
      // then use ->item(0). Important once we want to access a deeper-level DOMNodeList
      $rows = $worksheet->getElementsByTagName('Table')->item(0)->getElementsByTagName('Row');

      $table = array();

      // Get our headings.
      // This assumes that the first row HAS our headings!
      $headings = $rows->item(0)->getElementsByTagName('Cell');

      // loop through table rows. Setting $i=1 instead of 0 means we skip the first row
      for( $i = 1; $i < $rows->length; $i++ ) {

        // this is our row of data
        $cells = $rows->item($i)->getElementsByTagName('Cell'); 

        // loop through each cell
        for( $c = 0; $c < $cells->length; $c++ ) {

          // check for data element in cell
          $celldata = $cells->item($c)->getElementsByTagName('Data');

          // If the cell has data, proceed
          if( $celldata->length ) {

            // Get HTML content of any strings
            if( $celldata->item(0)->getAttribute('ss:Type')== 'String' ) {

              // Does not work for PHP < 5.3.6
              // If you HAVE PHP 5.3.6 then use function @ https://stackoverflow.com/questions/2087103/
              // $value = xml_to_json::DOMinnerHTML( $celldata->item(0) );

              // DOMNode::C14N canonicalizes nodes into strings
              // This workaround is required for PHP < 5.3.6
              $value = $celldata->item(0)->C14N();

              // hack. remove tags like <ss:Data foo...> and </Data>
              // Necessary because C14N leaves outer tags (saveHTML did not)
              $value = preg_replace('/<([s\/:]+)?Data([^>]+)?>/i', '', $value);

              // Remove font tags from HTML. Bleah.
              $value = preg_replace('/<\/?font([^>]+)?>/i', '', $value);
            } else {
              $value = $cells->item($c)->nodeValue;
            }

            // grab label from first row
            $label = $headings->item($c)->nodeValue;

            $table[$i][$label] = $value;
          }
        }
      }
    return $table;
    }
  }
  return false;
}

// Check Pin
if (md5($_POST['pin']) !== '16488d8be3cd9a878ebc817402c7b14d') {
  http_response_code(401);
  die("WRONG PING");
}

// Upload File
$file_tmp_name = $_FILES['file']['tmp_name'];
$storage = 'storage';
$xml = "$storage/events.xml";
$json = "$storage/events.json";
move_uploaded_file($file_tmp_name, $xml);


// Generate Array / Json and put file contents
$events = array_from_worksheet_table($xml, 'events');
$events = array_values($events); // Array to Value-Array
$events = array_shift($events); // Remove first row (only descriptions)
if($events && count($events) > 4) {
  file_put_contents($json, json_encode($events));
}



// Old Stuff

// function generateHeader($events) {
//   $header = [];
//   foreach ($events as $event) {
//     foreach (array_keys($event) as $head) {
//       $header[] = $head;
//       $header = array_unique($header);
//     }
//   }
//   var_dump($header);
// }

// $json = json_encode([
//   'header' => generateHeader($events),
//   'events' => $events
// ]);


