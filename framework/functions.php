<?php

    function basic_filter( $fieldset_label, $form_id, $grid_id, $ajax_url ){

        $return_string = '';

        $return_string .= '<div class="row">';
        $return_string .= '<div class="layout-grid-3"></div>';
        $return_string .= '<fieldset class="layout-grid-6 adf-region" data-adf-region-type="form" id="'.$form_id.'" data-adf-ajax-onshow="true" data-adf-ajax-url="'.$ajax_url.'">';
        $return_string .= '<legend>'.$fieldset_label.'</legend>';
        $return_string .= '<form action="#'.$grid_id.'" class="form-horizontal" method="post"></form>';
        $return_string .= '</fieldset>';
        $return_string .= '<div class="layout-grid-3"></div>';
        $return_string .= '</div>';

        echo $return_string;

    }