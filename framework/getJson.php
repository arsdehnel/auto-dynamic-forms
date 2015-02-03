<?php
$urlRoot = 'http://pedersoz-dv.bius.bi.corp:7001/';
// $page    = 'service/common/get-fields.action?pageCode=PROCESS_MASTER_FILTERS';
$page = $_REQUEST['client'].'/v2/service/common/'.$_REQUEST['action'].'.action?pageCode='.$_REQUEST['pageCode'];

// echo $urlRoot.$page;

echo makePostRequest( $urlRoot.$page );


// $token = getToken($apiUrl, $username, $password);

// // Here are some examples of how to query the priority/status values.
// // getTaskPriorities($apiUrl, $username, $token);
// // getTaskStatuses($apiUrl, $username, $token);

// createTask($apiUrl, $username, $token);

// function getToken($apiUrl, $username, $password)
// {
//     $url = $apiUrl . '/login';
//     $post = array(
//         'username' => $username,
//         'password' => $password,
//     );

//     $response = makePostRequest($url, $post);
//     $response = json_decode($response);
//     return $response->data->token;
// }

// function createTask($apiUrl, $username, $token)
// {
//     $url = $apiUrl.'/task';

//     $post = array(
//         'username'=>$username,
//         'token'=>$token,
//         'name'=>'Test Task',
//         'type_id'=>1,    // Get list of acceptable values from getTaskTypes()
//         'status_id'=>1,  // Get list of acceptable values from getTaskStatuses()
//         'due_date'=>'12/12/2014',
//         'comment'=>'This is a comment',
//         'priority'=>1,   // Get list of acceptable values from getTaskPriorities()
//         'project_id'=>5,   // For now, just know your project_id. If you view the project directly in WIP, it will be the last segment in the URL example: hostname/wip/project/29
//         'resource'=>array(1, 3), // Get list of acceptable values from getRoles()
//     );

//     $response2 = makePostRequest($url, $post);

//     echo $response2;
// }

// function getTaskTypes($apiUrl, $username, $token)
// {
//     echo makeGetRequest($apiUrl . '/tasktype', $username, $token);
// }

// function getTaskStatuses($apiUrl, $username, $token)
// {
//     echo makeGetRequest($apiUrl . '/taskstatus', $username, $token);
// }

// function getTaskPriorities($apiUrl, $username, $token)
// {
//     echo makeGetRequest($apiUrl . '/taskpriority', $username, $token);
// }

// function getRoles($apiUrl, $username, $token)
// {
//     echo makeGetRequest($apiUrl . '/role', $username, $token);
// }

function makePostRequest($url, $data)
{
    $postData = http_build_query($data);

    $username = 'dehnel';
    $password = '3a4d7a2mD(';


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

// function makeGetRequest($url, $username, $token)
// {
//     $data = [
//         'username' => $username,
//         'token' => $token,
//     ];

//     $getData = http_build_query($data);

//     $url = $url . "?$getData";

//     return file_get_contents($url);
// }

// ?>