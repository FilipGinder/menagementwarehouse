<!DOCTYPE html>
<html>
<head>
<title></title>

<!-- jquery -->
<script src="dodaci/jQuery/jQuery 3.5.1.min.js"></script>
<!-- jquery -->
<!-- bootstrap -->
<link rel="stylesheet" href="dodaci/bootstrap/css/bootstrap.min.css">
<script src="dodaci/bootstrap/js/bootstrap.min.js" crossorigin="anonymous"></script>


<script src="dodaci/stampanje/jQuery.print.js"></script>
<!-- bootstrap -->
<!-- moje scripte -->
<script src="src/js/script.js"></script>
<!-- moje scripte -->
<!-- moj css -->
<link rel="stylesheet" type="text/css" href="src/css/mystyle.css">
<link rel="stylesheet" type="text/css" href="src/css/faktura.css">
<!-- moj css -->
<!-- datatable -->

<link rel="stylesheet" type="text/css" href="dodaci/datatable/datatables.min.css"/>
<script type="text/javascript" src="dodaci/datatable/datatables.min.js"></script>
<!-- datatable -->
<!-- select chosen jquery -->
<script src="dodaci/chosen_select/chosen.jquery.min.js"></script>
<link rel="stylesheet" href="dodaci/chosen_select/chosen.min.css">
<!-- select chosen jquery -->

<script src="dodaci/progress/dist/jquery.circle-progress.js"></script>
</head>
<body>
	<div id="wait"><img src='slike/simple_loading.gif' width="100" height="100" /></div>

	<div class="" id="glavni_div">

		<div class="row" id="prvi_red">
			<div class="col-lg-4" id="dugmici_leva_strana_div">

		 <input type="button" class="dugmici_na_pocetnoj" id="" data-toggle="modal" data-target="#modal_izmena_admin_podataka" value="Izmena mojih podataka">

		 <input type="button" class="dugmici_na_pocetnoj" id="" data-toggle="modal" data-target="#modal_dodavanje_novog_klijenta" value="Dodavanje novog klijenta">

		 <input type="button" class="dugmici_na_pocetnoj" id="pregled_svih_klijenata_dugme"  value="Pregled svih klijenata">
		 <input type="button" class="dugmici_na_pocetnoj" id="" data-toggle="modal" data-target="#modal_dodavanje_novog_proizvoda" value="Dodavanje novog proizvoda">

		 <input type="button" class="dugmici_na_pocetnoj" id="pregled_magacina_modal_dugme"  value="Stanje magacina">

		 <input type="button" class="btn btn-success dugmici_na_pocetnoj" id="pravljenje_nove_fakture" value="Nova faktura">

			</div>
			<div class="col-lg-4" id="admin_podaci">
				
				<div id="ime_firme_prikaz_u_aplikaciji" class="prikaz_admin_podataka_na_pocetnoj"></div>
				<div id="sediste_firme_prikaz_u_aplikaciji" class="prikaz_admin_podataka_na_pocetnoj"></div>
				<div id="mesto_otpreme_prikaz_u_aplikaciji" class="prikaz_admin_podataka_na_pocetnoj"></div>
				<div class="prikaz_admin_podataka_na_pocetnoj"><span>PIB:&nbsp;</span><span id="pib_firme_prikaz_u_aplikaciji"></span></div>
				<div class="prikaz_admin_podataka_na_pocetnoj"><span>MATIČNI.BROJ:&nbsp;</span><span id="maticni_br_firme_prikaz_u_aplikaciji"></span></div>
				<div  class="prikaz_admin_podataka_na_pocetnoj"><span>TEKUĆI RAČUN:&nbsp;</span><span id="ziro_racun_prikaz_u_aplikaciji"></span></div>
				<div id="opis_firme_prikaz_u_aplikaciji" class="prikaz_admin_podataka_na_pocetnoj"></div>
				<div id="broj_telefona_prikaz_u_aplikaciji" class="prikaz_admin_podataka_na_pocetnoj"></div>
				<div id="fix_br_telefona_prikaz_u_aplikaciji" class="prikaz_admin_podataka_na_pocetnoj"></div>
				<div id="email_prikaz_u_aplikaciji" class="prikaz_admin_podataka_na_pocetnoj"></div>
			</div>
			<div class="col-lg-4" id="logo">
				
				
			</div>
		</div>
	



		<div class="row" id="treci_red">
			<div class="col-lg-12" id="prikaz_sto_faktura">
				<h3>Prikaz poslednjih 100 faktura</h3>
			</div>
			<div class="col-lg-12">

			 <table class="table table-bordered" id="prikaz_svih_faktura_na_pocetnoj">

                <thead>
	                 <tr>
	                   <td><b>R.B</b></td>
	                   <td><b>Ime klijenta</b></td>
	                   <td><b>Datum</b></td>
	                   <td><b>Status</b></td>
	                   <td><b>Valuta</b></td>
	                   <td><b>Ukupna vrednost</b></td>
	                   <td><b>Prikaži fakturu</b></td>
	                 </tr>
                 </thead>
                 <tbody>

                </tbody>

                <tfoot>
	                 <tr>
	                   <td><b>R.B</b></td>
	                   <td><b>Ime klijenta</b></td>
	                   <td><b>Datum</b></td>
	                   <td><b>Status</b></td>
	                   <td><b>Valuta</b></td>
	                   <td><b>Ukupna vrednost</b></td>
	                   <td><b>Prikaži fakturu</b></td>
	                 </tr>
                 </tfoot>
            
     </table>
     </div>
		</div>

			<div class="row" id="drugi_red">
			<div class="col-lg-12" id="naslov_drugi_red"><h3>Prikaz ukupnih vrednosti faktura</h3></div>
			<div class="col-lg-3" id="odabir_godine_za_prikaz_ukupne_vrednosti_faktura">
				  <h6>Izaberite prikaz po godinama:</h6>
				  
				  <select class="inputi_leva_strana" id="select_odabir_godine_ili_sve_ukupno_za_prikaz_vrednosti">
                    <option value="sve_ukupno" selected>Sve ukupno</option>
                    
                  </select>
                  <br><br><br>
                  <h6>Izaberite prikaz po klijentima:</h6>
				  
				  <select class="inputi_leva_strana" id="select_odabir_klijenti_ili_sve_ukupno_za_prikaz_vrednosti">
                    <option value="sve_ukupno_klijenti" selected>Sve ukupno</option>
                    
                  </select>

			</div>

			<div class="col-lg-3" id="ukupne_vrednosti_faktura_placenih">
				<h6><u>Izvršene</u></h6>
				<br>
				<span>Ukupan PDV</span>
				<br>
                <span id="span_ukupan_pdv_faktura_placenih"></span><span>&nbsp;RSD</span>  
                <br><br>
                <span>Ukupna poreska osnovica</span>                   
				<br>
				<span id="span_ukupna_poreska_osnovica_svih_faktura_placenih"></span><span>&nbsp;RSD</span>   
				<br><br>
				<span>Ukupna vrednost</span>            <!-- IZVRSENE FAKTURE -->
				<br>
				<b><span id="span_ukupna_vrednost_faktura_placenih"></span><span>&nbsp;RSD</span></b> 
                <div id="procenat_izvrsene" class="progress"></div>  <!-- PROCENAT -->
                <span>Procenat izvršenih faktura<br>od ukupnog broja faktura</span>
			</div>


			<div class="col-lg-3" id="ukupne_vrednosti_faktura_ne_placenih">
				<h6><u>Na čekanju</u></h6>
				<br>
				<span>Ukupan PDV</span>
				<br>
				<span id="span_ukupan_pdv_faktura_ne_placenih"></span><span>&nbsp;RSD</span> 
				<br><br>
                <span>Ukupna poreska osnovica</span>                      
				<br>
				<span id="span_ukupna_poreska_osnovica_svih_faktura_ne_placenih"></span><span>&nbsp;RSD</span>       
				<br><br>
				<span>Ukupna vrednost</span>                                               <!-- NA CEKANJU -->
				<br>
				<b><span id="span_ukupna_vrednost_faktura_ne_placenih"></span><span>&nbsp;RSD</span></b>   
				<div id="procenat_na_cekanju" class="progress"></div>  <!-- PROCENAT -->
				<span>Procenat faktura na čekanju<br>od ukupnog broja faktura</span>
			</div>


			<div class="col-lg-3" id="ukupne_vrednosti_faktura">
			    <h6><u>Ukupna vrednost svih faktura</u></h6>
			    <br>
			    <span>Ukupan PDV</span>	
			    <br>			
				<span id="span_ukupan_pdv_svih_faktura"></span><span>&nbsp;RSD</span> 
				<br><br>
                <span>Ukupna poreska osnovica</span>                      <!-- UKUPNA VREDNOST SVIH FAKTURA -->
				<br>
				<span id="span_ukupna_poreska_osnovica_svih_faktura"></span><span>&nbsp;RSD</span>
				<br><br>
				<span>Ukupna vrednost</span>
				<br>
				<b><span id="span_ukupna_vrednost_svih_faktura"></span><span>&nbsp;RSD</span></b>
				<div id="procenat_ukupne" class="progress"></div>  <!-- PROCENAT -->
			</div>
		</div>

	</div>
   <?php 
      include ('modali/izmena_admin_podataka_modal.php');
      include ('modali/dodavanje_novog_klijenta_modal.php');
      include ('modali/pregled_svih_klijenata_modal.php');
      include ('modali/prikaz_odredjenog_klijenta_pre_uredjivanja_modal.php');
      include ('modali/dodavanje_novog_proizvoda_modal.php');
      include ('modali/magacin_modal.php');
      include ('modali/prikaz_odredjenog_proizvoda_pre_uredjivanja_modal.php');
      include ('modali/prikaz_klijentovih_faktura_modal.php');
      include ('stranice/faktura.php');
    ?>
</body>
</html>