<?php

if(!mysql_connect('localhost', 'amit', 'prasam04')){
    die('Unable to connect. Check your connection parameters.');
}
$query = 'create databse if not exists pos';
mysql_query($query, $db) or die (mysql_error($db));

mysql_select_db('pos',$db) or die(mysql_error($db));

$query = 'Create table cart { 

            item_id integer unsigned not null auto_increment,
            item_name varchar2(50) not null,
            item_price integer not null,
            

}
ENGINE=MyISAM';

mysql_query($query, $db) or die(mysql_error($db));

echo 'pos dB created';




?>