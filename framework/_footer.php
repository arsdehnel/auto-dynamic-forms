<?php include('constants.php'); ?>
<?php
    if( count( $todo ) > 0 ):
        $items_str = '';
        foreach( $todo as $item ):
            if( $item[0] == "pending" ):
                $items_str .= '* '.$item[1];
            else:
                $items_str .= "* ~~".$item[1]."~~";
            endif;
            $items_str .= "\n";
        endforeach;
        echo '<ul class="to-do">';
        echo $Parsedown->text($items_str);
        echo '</ul><!-- /.to-do';
    endif;
?>
        <div class="adf-grid-overlay-editor adf-region" data-adf-ajax-onshow="true" data-adf-region-type="overlay-grid" id="overlay-editor"></div>
        <div class="adf-modal adf-region" id="modal-window"></div>
        <div class="backdrop hide"></div>
    </main>
    <footer>
        <nav id="nav-footer" class="nav-footer">
        </nav><!-- #nav-footer.nav-footer -->
    </footer>
    <script src="<?php echo CLIENT_PATH ?>js/plugins.min.js"></script>
    <script src="<?php echo CLIENT_PATH ?>js/hbsTemplates.min.js"></script>
    <script src="<?php echo CLIENT_PATH ?>js/adf.min.js"></script>
</body>
</html>