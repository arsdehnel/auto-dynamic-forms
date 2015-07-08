<?php

    require_once('constants.php');

    // used for any non-dev environment
    $page         = $_REQUEST['client'].'/v2/service/'.$_REQUEST['action'].'.action?pageCode='.$_REQUEST['pageCode'];

    $urls         = [];

    // this should be just the full URL
    $urls['dev']  = 'http://dehnel-27mc.bius.bi.corp/auto/auto-dynamic-forms/framework/json/'.$_REQUEST['devPath'];
    $urls['zack'] = 'http://campusdev039.bius.bi.corp:7001/'.$page;
    $urls['qa']   = 'http://'.$_REQUEST['client'].'qa.biworldwide.com/'.$page;

 // echo $urls[JSON_SOURCE];

echo makePostRequest( $urls[JSON_SOURCE] );

function makePostRequest($url, $data)
{
    $postData = http_build_query($data);

    $username = 'dehnel';
    $password = '3a4d7a2mD_';

    $ch = curl_init( $url );
    curl_setopt( $ch, CURLOPT_POST, 1);
    curl_setopt( $ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt( $ch, CURLOPT_HEADER, 0);
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt( $ch, CURLOPT_USERPWD, $username . ":" . $password);
    //curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: multipart/form-data"));
    return curl_exec( $ch );
}

?>