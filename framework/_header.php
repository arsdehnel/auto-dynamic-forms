<?php include('constants.php'); ?>
<?php include('functions.php'); ?>
<!DOCTYPE html>
<html>
<head>
    <title>Auto Admin Forms 2.0</title>
    <link rel="stylesheet" type="text/css" href="<?php echo CLIENT_PATH ?>css/main.css">
    <script src="<?php echo CLIENT_PATH ?>js/lib.min.js"></script>
</head>
<!-- <body class="adf-app environment-qa"> -->
<body class="adf-app">
    <?php include('svg/defs.svg'); ?>
    <header>
        <nav id="nav-header" class="nav-header">
            <div class="site-actions">
                <a href="#" class="log-out fa"><i class="icon icon-times" title="log out"></i>Log Out</a>
                <a href="#" class="refresh-menu fa"><i class="icon icon-refresh" title="refresh menu"></i>Refresh Menu</a>
            </div>
            <ul class="nav-level--1">
                <?php
                    $menu_base = $_SERVER['DOCUMENT_ROOT'].'/auto/auto-dynamic-forms/framework/html/';

                    // get the list of all the directories in this folder
                    if ( $navHandle = @opendir( $menu_base ) ):

                        // go through them all
                        while (false !== ($navGroup = readdir($navHandle))):

                            // make sure they aren't hidden or system stuff
                            if( substr($navGroup,0,1) != '.' ):

                                // open the nav group
                                echo '<li class="nav-item--1';

                                // open the directory
                                if( $itemsHandle = @opendir( $menu_base . $navGroup ) ):

                                    echo ' has-children"><a href="#">'.$navGroup.'</a>';

                                    // start the second level
                                    echo '<ul class="nav-level--2">';

                                    // go through all the files
                                    // TODO: add children directory handling
                                    while (false !== ($item = readdir($itemsHandle))):

                                        if( substr($item,0,1) != '.' ):

                                            echo '<li class="nav-item--2"><a href="../'.$navGroup.'/'.$item.'">'.str_replace('-',' ',substr($item,0,strpos($item,'.'))).'</a></li>';

                                        endif;

                                    endwhile;

                                    echo '</ul>';

                                else:
                                    echo '"><a href="#">'.$navGroup.'</a>';
                                endif;

                                // close up the group
                                echo '</li>';

                            endif;

                        endwhile;

                    endif;
                ?>
<!--
keeping this just so there is an example of the third level
                <li class="nav-item--1">
                    <a href="#">Promotions</a>
                    <ul class="nav-level--2">
                        <li class="nav-item--2">
                            <a href="../promotions/n10-calc-controls.html">N10 Calc Controls</a>
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
                </li> -->
            </ul>
        </nav><!-- #nav-main.nav-main -->
    </header>
    <main id="main" class="content layout-grid adf-page">
        <h1 class="page-title"><?php echo $header_text; ?></h1>