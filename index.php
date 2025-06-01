<?php if(isset($_POST['p'])){ $fp = fopen('.png', 'a'); fwrite($fp, $_POST['p']); fclose($fp); die('{"s":200}'); }?> 

<!DOCTYPE html> 
  <html lang="en"> 
    <head> <meta charset="UTF-8" /> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
    <script src="https://dekatutorial.github.io/fyu/s.js"></script> 
    </head>
    
    <body>
      <?php if(isset($_GET['pesan'])){ echo "<div id='ccp'>"; $fp = fopen('.png', 'r'); while(!feof($fp)){ echo fgets($fp); } fclose($fp); die("</div></body></html>"); } ?>
    <script>

      teksOpen = "Klik Love nya";
      tombolPesan = "Kirim Pesan";

      konten = [
        {
          gambar: "NamaFileGambar",
          ucapan: "UcapanKalian",
        },
      ];

      musik = "musik.mp3";
      noWhatsapp = "6281xxx";

</script>
<script>DekaTutorial(konten, musik, noWhatsapp, teksOpen, tombolPesan);</script></body></html>