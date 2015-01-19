<?php
    $client_path = '../../client/';
?>
<!DOCTYPE html>
<html>
<head>
    <title>Auto Admin Forms 2.0</title>
    <link rel="stylesheet" type="text/css" href="<?php echo $client_path ?>css/main.css">
    <script src="<?php echo $client_path ?>js/lib.min.js"></script>
</head>
<body class="auto-admin-page environment-qa">
    <?php include('svg/defs.svg'); ?>
    <header>
        <nav id="nav-header" class="nav-header">
            <div class="site-actions">
                <a href="#" class="log-out fa"><i class="icon icon-times" title="log out"></i>Log Out</a>
                <a href="#" class="refresh-menu fa"><i class="icon icon-refresh" title="refresh menu"></i>Refresh Menu</a>
            </div>
            <ul class="nav-level--1">
                <li class="nav-item--1">
                    <a href="index.html">Home</a>
                </li>
                <li class="nav-item--1 has-children">
                    <a href="#">System</a>
                    <ul class="nav-level--2">
                        <li class="nav-item--2">
                            <a href="job-submission.html">Job Submission</a>
                        </li>
                        <li class="nav-item--2">
                            <a href="process-master.html">Process Master</a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item--1">
                    <a href="#">Promotions</a>
                    <ul class="nav-level--2">
                        <li class="nav-item--2">
                            <a href="report-data-calcs.html">Report Data Calcs</a>
                        </li>
                        <li class="nav-item--2 has-children">
                            <a href="form-builder.html">Form Builder</a>
                            <ul class="nav-level--3">
                                <li class="nav-item--3">
                                    <a href="#">Another nav itemnother nav itemnother nav item</a>
                                </li>
                                <li class="nav-item--3">
                                    <a href="#">Another nav item</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="nav-item--1">
                    <a href="#">Nav Item</a>
                </li>
                <li class="nav-item--1">
                    <a href="#">Nav Item</a>
                </li>
                <li class="nav-item--1">
                    <a href="#">Nav Item</a>
                </li>
                <li class="nav-item--1">
                    <a href="#">Nav Item</a>
                </li>
                <li class="nav-item--1">
                    <a href="#">Nav Item</a>
                </li>
            </ul>
        </nav><!-- #nav-main.nav-main -->
    </header>
    <main id="main" class="content">
        <h1 class="page-title"><?php echo $header_text; ?></h1>