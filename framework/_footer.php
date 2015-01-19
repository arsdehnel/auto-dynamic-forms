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
  </main>
    <footer>
        <nav id="nav-footer" class="nav-footer">
        </nav><!-- #nav-footer.nav-footer -->
    </footer>
    <div class="body-overlay hide"></div>
    <script src="<?php echo $client_path ?>js/plugins.min.js"></script>
    <script src="<?php echo $client_path ?>js/hbsTemplates.min.js"></script>
    <script src="<?php echo $client_path ?>js/adf.min.js"></script>
</body>
</html>