<?php

    function basic_filter( $fieldset_label, $form_id, $grid_id, $ajax_url, $ajax_onshow ){

        $return_string = '';

        $return_string .= '<div class="row">';
        $return_string .= '<div class="layout-grid-3"></div>';
        $return_string .= form_region( 'fieldset', $fieldset_label, $form_id, $grid_id, $ajax_url, $ajax_onshow, true );
        $return_string .= '<div class="layout-grid-3"></div>';
        $return_string .= '</div>';

        echo $return_string;

    }

    function form_region( $element, $label_text, $form_id, $grid_id, $ajax_url, $ajax_onshow, $include_closing_tag ) {

        $return_string = '';
        $return_string .= '<fieldset class="layout-grid-6 adf-region" data-adf-region-type="form" id="'.$form_id.'" data-adf-ajax-onshow="'.$ajax_onshow.'" data-adf-ajax-url="'.$ajax_url.'">';
        $return_string .= '<legend>'.$label_text.'</legend>';
        $return_string .= '<form action="#'.$grid_id.'" class="form-horizontal" method="post"></form>';
        if( $include_closing_tag ){
            $return_string .= '</fieldset>';
        }
        return $return_string;

    }

    function basic_grid( $id, $ajax_url ){

        $return_string = '';

        $return_string .= '<div class="adf-region" id="'.$id.'" data-adf-region-type="grid" data-adf-ajax-url="'.$ajax_url.'"></div>';

        echo $return_string;

    }