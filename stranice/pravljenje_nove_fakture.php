<!DOCTYPE html>
<html>
<head>
	<title></title>
	<!-- jquery -->
<script src="../dodaci/jQuery/jQuery 3.5.1.min.js"></script>
<!-- jquery -->

<!-- bootstrap -->
<link rel="stylesheet" href="../dodaci/bootstrap/css/bootstrap.min.css">
<script src="../dodaci/bootstrap/js/bootstrap.min.js" crossorigin="anonymous"></script>
<!-- bootstrap -->

<!-- select chosen jquery -->
<script src="../dodaci/chosen_select/chosen.jquery.min.js"></script>
<link rel="stylesheet" href="../dodaci/chosen_select/chosen.min.css">
<!-- select chosen jquery -->
<!-- moje scripte -->
<script src="../src/js/script_pravljenje_fakture.js"></script>
<!-- moje scripte -->
<!-- moj css -->
<link rel="stylesheet" type="text/css" href="../src/css/mystyle_izrada_faktura.css">
<!-- moj css -->
</head>
<body>

<div class="">
    <div class="row">
        <div class="col-lg-9" id="prvi_red_levo"><h4>Izrada faktura</h4></div>
        <div class="col-lg-2" id="prvi_red_centar"><h5>Ukupna vrednost fakture:</h5><span id="ispis_trenuto_ukupne_cifre_na_fakturi">0.00</span><h5>RSD</h5></div>
        <div class="col-lg-1" id="prvi_red_desno">
              <!-- <button type="button" class="close" id="iks_zatvori_pravljenje_fakture" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button> -->
        </div>
    </div>
	<div class="row">
		<div class="col-lg-3" id="izrada_fakture_leva_strana_div">
			
         <label for="ime_klijenta_na_izradi_fakture"><b>Ime klijenta:</b></label>
         <input type="text" class="inputi_leva_strana" id="ime_klijenta_na_izradi_fakture" value="">

         <label for="pib_klijenta_na_izradi_fakture"><b>PIB klijenta:</b></label>
         <input type="text" class="inputi_leva_strana" id="pib_klijenta_na_izradi_fakture" value="">

         <label for="maticni_br_klijenta_na_izradi_fakture"><b>Matični broj klijenta:</b></label>
         <input type="text" class="inputi_leva_strana" id="maticni_br_klijenta_na_izradi_fakture" value="">

         <label for="email_klijenta_na_izradi_fakture"><b>Email klijenta:</b></label>
         <input type="text" class="inputi_leva_strana" id="email_klijenta_na_izradi_fakture" value="">

         <label for="adresa_klijenta_na_izradi_fakture"><b>Adresa klijenta:</b></label>
         <input type="text" class="inputi_leva_strana" id="adresa_klijenta_na_izradi_fakture" value="">

         <label for="telefon_klijenta_na_izradi_fakture"><b>Telefon klijenta:</b></label>
         <input type="text" class="inputi_leva_strana" id="telefon_klijenta_na_izradi_fakture" value="">

         <label for="ziro_racun_klijenta_na_izradi_fakture"><b>Žiro račun klijenta:</b></label>
         <input type="text" class="inputi_leva_strana" id="ziro_racun_klijenta_na_izradi_fakture" value="">

         <label for="datum_fakture_na_izradi_fakture"><b>Datum fakture:</b></label>
         <input type="date" class="inputi_leva_strana" id="datum_fakture_na_izradi_fakture" value="">

         <label for="valuta_fakture_na_izradi_fakture"><b>Valuta fakture:</b></label>
                  
                  <select class="inputi_leva_strana" id="valuta_fakture_na_izradi_fakture">
                    <option value="RSD">RSD</option>
                    <option value="EUR">EUR</option>
                  </select>

         <label for="nacin_placanja_fakture_na_izradi_fakture"><b>Način plaćanja:</b></label>
                  
                  <select class="inputi_leva_strana" id="nacin_placanja_fakture_na_izradi_fakture">
                    <option value="Gotovinski">Gotovinski</option>
                    <option value="Bezgotovinski">Bezgotovinski</option>
                  </select>

         <label for="da_li_odstampati_brojeve_slovima"><b>Da li želite da ukupnu cifru odštampate slovima:</b></label>
                  
                  <select class="inputi_leva_strana" id="da_li_odstampati_brojeve_slovima">
                    <option value="ne_stampati" selected>Ne</option>
                    <option value="stampati">Da</option>
                  </select>         

         <br>
         <input type="hidden" id="cuvanje_id_klijenta">
         <!-- skriveni input za cuvanje id-a klijenta -->
         <input type="button" class="btn btn-primary" id="dugme_sacuvaj_klijenta_na_izradi_fakture" value="Sačuvaj">
        
		</div>
		<div class="col-lg-9"id="red_za_punjenje_fakture_desno">
      <div id="red_za_punjenje_fakture">
    
    <!-- TABELA IZ KOJE UZIMAMO PODATKE ZA UNOS U FAKTURU --> 
              <table class="table" id="moja_tabela">
                <thead>
                  <tr>
                    <th style="width: 30%;">Naziv artikla</th>
                    <th style="width: 30%;">Kolicina</th>
                     <th>Cena sa<br>PDV</th>
                    <th style="width: 20%;">Stanje<br>magacina</th>
                    <th style="width: 20%;"></th>
                    </tr>
                </thead>
                <tbody>
                  <tr>
                     <td  style="width: 20%;">
                         <select style="width: 100%;" class="js-example-basic-single" id="polje_za_unos_podataka_artikli" name="polje_za_unos_podataka_artikli">
                          <option disabled selected>Izaberi proizvod</option>
                        </select>
                    </td>
                      <td style="width: 20%;"><abbr title='Kolicinu mozete promeniti'><input type="number" id="polje_za_unos_podataka_kolicina" name="kolicina" value=""></abbr></td>

                       <td style="width: 20%;"><input type="text" id="polje_za_unos_podataka_cena_sa_pdv" name="cena_sa_pdv" disabled></td>
                      
                     <td style="width: 20%;"><input type="text" id="trenutno_stanje_magacina_odredjenog_proizvoda" disabled></td>
                      <td style="width: 20%;"><input type="image" src="../slike/check-mark.png" name="plus" id="plus" value="Sacuvaj"></td>
                </tr>
                </tbody>

              </table>
<!-- TABELA IZ KOJE UZIMAMO PODATKE ZA UNOS U FAKTURU --> 


<!-- TABELA U KOJOJ ISPISUJEMO REDOVE -->

              <table class="table" id="moja_tabela_za_ispis_redova">
                <thead>
                  <tr>
                    <th>Naziv artikla</th>
                    <th>JM</th>
                    <th>Kolicina</th>
                    <th>Cena sa<br>PDV</th>
                    <th>Vrednost sa<br>PDV</th>
                    <th>Ukloni</th>
                    </tr>
                </thead>
                <tbody>

                  </tbody>
              </table>
<!-- TABELA U KOJOJ ISPISUJEMO REDOVE -->
     

         </div> 
         
         <button class="btn btn-primary" id="sacuvaj_fakturu">Sačuvaj fakturu</button> 
         <button class="btn btn-danger" id="obrisi_fakturu_u_izradi">Obriši fakturu i izadju</button>
         <!-- <button class="btn btn-warning" id="obrisi_sve_redove_fakture">Obriši sve redove</button>   -->
        </div>
	</div>



</div>

<?php
include("../modali/odabir_novog_klijenta_za_fakturu.php");
 ?>

</body>
</html>