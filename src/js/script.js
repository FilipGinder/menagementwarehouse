$(document).ready(function(){
window.prikaz_podataka_o_korisniku_na_pocetnoj();
window.prikaz_svih_faktura_na_pocetnoj_strani();
window.izmena_podataka_o_korisniku_na_pocetnoj();  //ukoliko se promene podaci o adminu zovemo ovu funkciju
window.dodavanje_novog_klijenta();
//window.pregled_svih_klijenta();
uredjivanje_odredjenog_klijenta();
window.unos_novog_proizvoda();
//window.pregled_magacina();
window.pregled_ukupnih_vrednosti_magacina();
window.uredjivanje_odredjenog_proizvoda();
window.pravljenje_nove_fakture();
window.prikaz_ukupne_vrednosti_faktura();
window.prikaz_ukupne_vrednosti_faktura_za_opciju_sve_ukupno();
window.izmena_statusa_fakture();
window.menjanje_divova_za_prikaz();







$("#pregled_svih_klijenata_dugme").click(function(){  

window.pregled_svih_klijenta();
});
$("#pregled_magacina_modal_dugme").click(function(){  

window.pregled_magacina();
});


$(document).ajaxStart(function(){
  $("#wait").css("display", "block"); //pri ucitavanju ajax poziva on aktivira ovaj div za ucitavanje

  });
  $(document).ajaxComplete(function(){   //kad se ajax zavrsi on ga gasi i prikazuje ono sto ajax treba da prikaze
    $("#wait").css("display", "none");   //ovo je za ucitavanje prilikom slanja emaila treba ga namestiti za sve na body
  });


})

	window.prikaz_podataka_o_korisniku_na_pocetnoj = function(){
      var verifikacija_prikaz_podataka_o_korisniku_na_pocetnoj = "verifikacija_prikaz_podataka_o_korisniku_na_pocetnoj";
        $.post("src/php/php_pocetna/handler_pocetna.php",{
          verifikacija_prikaz_podataka_o_korisniku_na_pocetnoj:verifikacija_prikaz_podataka_o_korisniku_na_pocetnoj,
        },function(data,status){
           var data = jQuery.parseJSON(data);

            $("#ime_firme_prikaz_u_aplikaciji, #ime_korisnika_na_fakturi").html(data[0][0]);
            $("#sediste_firme_prikaz_u_aplikaciji, #sediste_firme_korisnika_na_fakturi").html(data[0][1]);
            $("#mesto_otpreme_prikaz_u_aplikaciji, #mesto_otpreme_korisnika_na_fakturi, #mesto_izdavanja_fakture").html(data[0][2]);
            $("#pib_firme_prikaz_u_aplikaciji, #pib_korisnika_na_fakturi").html(data[0][3]);
            $("#maticni_br_firme_prikaz_u_aplikaciji, #maticni_br_korisnika_na_fakturi").html(data[0][4]);
            $("#ziro_racun_prikaz_u_aplikaciji, #tr_korisnika_na_fakturi").html(data[0][5]);
            $("#opis_firme_prikaz_u_aplikaciji").html(data[0][6]);
            $("#broj_telefona_prikaz_u_aplikaciji").html(data[0][7]);
            $("#fix_br_telefona_prikaz_u_aplikaciji").html(data[0][8]);
            $("#email_prikaz_u_aplikaciji").html(data[0][9]);

           if(data[0][10] == null || data[0][10] == ""){
             $("#logo").html('<img src="slike/Logo-genericki.png" height="180" width="180" alt="sipak" data-toggle="modal" data-target="#ceo_modal_promena_logoa" data-backdrop="false" id="slika_logo_pocetna">');
           }                 //ovim prikazuje genericku sliku na mestu logoa u samom programu/aplikaciji a ovim ispod logo ako postoji
           
            
            //ispis podataka u inpute u modalu za promenu admin podataka
            $("#izmena_admin_podataka_ime_firme").val(data[0][0]);
            $("#izmena_admin_podataka_sediste_firme").val(data[0][1]);
            $("#izmena_admin_podataka_mesto_otpreme").val(data[0][2]);          
            $("#izmena_admin_podataka_pib_firme").val(data[0][3]);
            $("#izmena_admin_podataka_maticni_br_firme").val(data[0][4]);
            $("#izmena_admin_podataka_ziro_racun").val(data[0][5]);
            $("#izmena_admin_podataka_opis_firme").val(data[0][6]);
            $("#izmena_admin_podataka_broj_telefona").val(data[0][7]);
            $("#izmena_admin_podataka_fix_br_telefona").val(data[0][8]);
            $("#izmena_admin_podataka_email").val(data[0][9]);
            //ispis podataka u inpute u modalu za promenu admin podataka
        });


     //prikaz godina u select prikaz ukupnih vrednosti faktura
     var verifikacija_prikaz_godina_u_selectu = "verifikacija_prikaz_godina_u_selectu";
        $.post("src/php/php_pocetna/handler_pocetna.php",{
          verifikacija_prikaz_godina_u_selectu:verifikacija_prikaz_godina_u_selectu,
        },function(data,status){
           var data = jQuery.parseJSON(data);
           var rezultat = "";

           for(var i=0; i<data.length;i++){

              rezultat+="<option>"+data[i][0]+"</option>";
         }

           $("#select_odabir_godine_ili_sve_ukupno_za_prikaz_vrednosti").append(rezultat);

         })
     //prikaz godina u select prikaz ukupnih vrednosti faktura

    //prikaz imena klijenata u selektu ukupne vrednosti ali samo onih koji imaju bar jednu fakturu kreiranu
     var verifikacija_prikaz_imena_klijenata_u_selectu = "verifikacija_prikaz_imena_klijenata_u_selectu";
        $.post("src/php/php_pocetna/handler_pocetna.php",{
          verifikacija_prikaz_imena_klijenata_u_selectu:verifikacija_prikaz_imena_klijenata_u_selectu,
        },function(data,status){
           var data = jQuery.parseJSON(data);
           var rezultat = "";

           for(var i=0; i<data.length;i++){

              rezultat+="<option>"+data[i][0]+"</option>";
         }

           $("#select_odabir_klijenti_ili_sve_ukupno_za_prikaz_vrednosti").append(rezultat);

         })
   //prikaz imena klijenata u selektu ukupne vrednosti ali samo onih koji imaju bar jednu fakturu kreiranu
}
window.izmena_podataka_o_korisniku_na_pocetnoj = function(){

       $("#sacuvaj_izmenu_podataka_o_adminu").click(function(){

            var ime_firme = $("#izmena_admin_podataka_ime_firme").val();
            var sediste_firme = $("#izmena_admin_podataka_sediste_firme").val();
            var mesto_otpreme = $("#izmena_admin_podataka_mesto_otpreme").val();
            var pib_firme = $("#izmena_admin_podataka_pib_firme").val();
            var maticni_br_firme = $("#izmena_admin_podataka_maticni_br_firme").val(); //uzimanje vrednosti inputa
            var ziro_racun = $("#izmena_admin_podataka_ziro_racun").val();      //za promenu podataka
            var opis_firme = $("#izmena_admin_podataka_opis_firme").val();
            var broj_telefona = $("#izmena_admin_podataka_broj_telefona").val();
            var fix_br_telefona = $("#izmena_admin_podataka_fix_br_telefona").val();
            var email = $("#izmena_admin_podataka_email").val();

            var verifikacija_izmena_podataka_o_korisniku_na_pocetnoj = "verifikacija_izmena_podataka_o_korisniku_na_pocetnoj";
        $.post("src/php/php_pocetna/handler_pocetna.php",{
          verifikacija_izmena_podataka_o_korisniku_na_pocetnoj:verifikacija_izmena_podataka_o_korisniku_na_pocetnoj,
          ime_firme:ime_firme,
          sediste_firme:sediste_firme,
          mesto_otpreme:mesto_otpreme,
          pib_firme:pib_firme,
          maticni_br_firme:maticni_br_firme,   //slace u php
          ziro_racun:ziro_racun,
          opis_firme:opis_firme,
          broj_telefona:broj_telefona,
          fix_br_telefona:fix_br_telefona,
          email:email,
        },function(data,status){
           prikaz_podataka_o_korisniku_na_pocetnoj();  //refresh podataka na pocetnoj
           $('#modal_izmena_admin_podataka').modal('toggle');  //zatvaranje modala
              
        });
          })
   }      



window.dodavanje_novog_klijenta = function(){

       $("#sacuvaj_dodavanje_novog_klijenta_dugme").click(function(){
        
        var ime_klijenta = $("#dodavanje_novog_klijenta_ime_klijenta").val();

        //PRVO IDE PROVERA DA LI KLIJENT SA OVIM 'IMENOM' VEC POSTOJI U BAZI
        var verifikacija_provera_da_li_klijent_postoji_u_bazi = "verifikacija_provera_da_li_klijent_postoji_u_bazi";
        $.post("src/php/php_pocetna/handler_pocetna.php",{
            verifikacija_provera_da_li_klijent_postoji_u_bazi:verifikacija_provera_da_li_klijent_postoji_u_bazi,
            ime_klijenta:ime_klijenta,           
        },function(data,status){
          var data = jQuery.parseJSON(data);

         if(data != "")
         {
            alert('Klijent sa ovim imenom vec postoji');
         }
         else
         {
         
           

        //ZATIM IDE UNOS KLIJENTA U BAZU    
            var adresa_klijenta = $("#dodavanje_novog_klijenta_adresa_klijenta").val();
            var pib_firme = $("#dodavanje_novog_klijenta_pib_klijenta").val();
            var maticni_br_klijenta = $("#dodavanje_novog_klijenta_maticni_br_klijenta").val(); //uzimanje vrednosti inputa
            var email_klijenta = $("#dodavanje_novog_klijenta_email_klijenta").val();      //za promenu podataka
            var broj_telefona_klijenta = $("#dodavanje_novog_klijenta_telefon_klijenta").val();
            var ziro_racun_klijenta = $("#dodavanje_novog_klijenta_ziro_racun").val();

           if(ime_klijenta == "" || adresa_klijenta == "" || pib_firme == "" || maticni_br_klijenta == "" || email_klijenta == "" || broj_telefona_klijenta == "" || ziro_racun_klijenta == "")
           {
              alert('Molimo Vas popunite sva polja');
           }
           else
           {
              var verifikacija_dodavanje_novog_klijenta = "verifikacija_dodavanje_novog_klijenta";
        $.post("src/php/php_pocetna/handler_pocetna.php",{
          verifikacija_dodavanje_novog_klijenta:verifikacija_dodavanje_novog_klijenta,
          ime_klijenta:ime_klijenta,
          adresa_klijenta:adresa_klijenta,
          pib_firme:pib_firme,
          maticni_br_klijenta:maticni_br_klijenta,
          email_klijenta:email_klijenta,
          broj_telefona_klijenta:broj_telefona_klijenta,
          ziro_racun_klijenta:ziro_racun_klijenta
        },function(data,status){
         //  ();  //REFRESH U LISTI KLIJENATA FUNKCIJA
           $('#modal_dodavanje_novog_klijenta').modal('toggle');  //zatvaranje modala

           $("#dodavanje_novog_klijenta_ime_klijenta").val('');
           $("#dodavanje_novog_klijenta_adresa_klijenta").val('');
           $("#dodavanje_novog_klijenta_pib_klijenta").val('');
           $("#dodavanje_novog_klijenta_maticni_br_klijenta").val(''); //praznjenje vrednosti inputa
           $("#dodavanje_novog_klijenta_email_klijenta").val('');      //za moguci novi unos novog klijenta
           $("#dodavanje_novog_klijenta_telefon_klijenta").val('');
           $("#dodavanje_novog_klijenta_ziro_racun").val('');
     
          $("#prikaz_kklijenata_u_tabeli").DataTable().destroy();
          window.pregled_svih_klijenta();
          alert('Klijent uspesno dodat');
        });
           }
           }
       })
          
       })
     }


window.pregled_svih_klijenta = function(){
            
            var verifikacija_pregled_svih_klijenata = "verifikacija_pregled_svih_klijenata";

            $.post("src/php/php_pocetna/handler_pocetna.php",{
                verifikacija_pregled_svih_klijenata:verifikacija_pregled_svih_klijenata
            },function(data,status){
                
                var data = jQuery.parseJSON(data);
          
                
                var rezultat = "";
                for(var i=0; i<data.length;i++)
                {
     rezultat +='<tr><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'</td><td>'+data[i][6]+'</td><td>'+data[i][7]+'</td><td>'+data[i][8]+'</td><td><button id="prikazi_klijentove_fakture_dugme" class="btn btn-primary" onClick="prikazi_klijentove_fakture('+data[i][1]+')">Fakture</button></td><td><button id="uredi_klijenta" class="btn btn-warning" onClick="prikazi_odredjenog_klijenta_pre_uredjivanja('+data[i][1]+')">Uredi</button></td><td><button class="btn btn-danger" onClick="izbrisi_odredjenog_klijenta('+data[i][1]+')">Izbriši</button></td></tr>';
             
                }

                $("#prikaz_kklijenata_u_tabeli tbody").html(rezultat);
                $("#prikaz_kklijenata_u_tabeli").DataTable({      //OVIM DEFINISEMO DODATAK ZA TABELU
                               "language": {
                                   "lengthMenu": "Prikaži _MENU_",
                                   "zeroRecords": "Nema rezultata pretrage",
                                   "info": "Stranica _PAGE_ od ukupno _PAGES_",    //OVIM DEFINISEMO SRPSKI JEZIK U DODATKU
                                   "infoEmpty": "Nema rezultata",
                                   "infoFiltered": "(od ukupno _MAX_ faktura)",    //OVA DVA PREVODA SU MORALA OVDE DA STOJE JER MORAJU BITI TU ODMAH ISPOD UCITAVANJA
                                   "search":         "Pronadji klijenta:",
                                   "paginate": {
                                               "first":      "Prva",
                                               "last":       "Poslednja",
                                               "next":       "Sledeca",
                                               "previous":   "Predhodna"
                                             },
                                         "loadingRecords": "Ucitavanje...",
                                         "loadingRecords": "Obrada..."
                                     },
                                      "bSort": false,                                     
                                     "pagingType": "full_numbers",  //POKAZUJE SVE BROJEVE PAGINACIJE
                                      "responsive": false,
                                      "retrieve": true,
                                     "scrollCollapse": true,
                                     "scrollY": 375,
                                  //    "scrollX": true,
                                     "paging":         true,
                                    "searching": true,
                                     "search": {
                                                  "search": ""
                                                },
                                     //            "deferRender": true, 
        
                        //                        "bAutoWidth": false,
            // "buttons": [
            //     'excel',
            //     {
            //         "extend": 'pdfHtml5',
            //         "orientation": 'landscape',
            //         "pageSize": 'LEGAL' }
                              
            // ]
                            

                                          });



            });




  



//$(window).trigger('resize'); 



  

}

window.prikazi_odredjenog_klijenta_pre_uredjivanja = function(id_klijenta){

  $('#modal_prikaz_odredjenog_klijenta_pre_uredjivanja').modal('toggle'); //otvaranje modala
  var verifikacija_prikazi_odredjenog_klijenta_pre_uredjivanja = "verifikacija_prikazi_odredjenog_klijenta_pre_uredjivanja";
  $.post("src/php/php_pocetna/handler_pocetna.php",{
    verifikacija_prikazi_odredjenog_klijenta_pre_uredjivanja:verifikacija_prikazi_odredjenog_klijenta_pre_uredjivanja,
    id_klijenta:id_klijenta
  },function(data,status){

     var data = jQuery.parseJSON(data);

     $("#naslov_izmene_podataka_odredjenog_klijenta").html('Uredi klijenta:  '+data[0][1]);

     $("#izmena_klijentovih_podataka_ime_firme").val(data[0][1]);
     $("#izmena_klijentovih_podataka_adresa_firme").val(data[0][2]);
     $("#izmena_klijentovih_podataka_pib_firme").val(data[0][3]);
     $("#izmena_klijentovih_podataka_maticni_br_firme").val(data[0][4]);
     $("#izmena_klijentovih_podataka_email").val(data[0][5]);
     $("#izmena_klijentovih_podataka_telefon").val(data[0][6]);
     $("#izmena_klijentovih_podataka_ziro_racun").val(data[0][7]);
     $("#izmena_podataka_klijenta").val(data[0][0]); //dugmetu dodeljujemo vrednost id-a zeljenog klijenta
  })
}

window.uredjivanje_odredjenog_klijenta = function()
{
   $("#izmena_podataka_klijenta").click(function(){

            var id_klijenta = $("#izmena_podataka_klijenta").val(); //ovde uzimamo vrednost id-a zeljenog klijenta
            var ime_firme_klijenta = $("#izmena_klijentovih_podataka_ime_firme").val();
            var adresa_firme_klijenta = $("#izmena_klijentovih_podataka_adresa_firme").val();
            var pib_firme_klijenta = $("#izmena_klijentovih_podataka_pib_firme").val();
            var maticni_br_firme_klijenta = $("#izmena_klijentovih_podataka_maticni_br_firme").val(); //uzimanje vrednosti inputa
            var email_klijenta = $("#izmena_klijentovih_podataka_email").val();                       //za promenu podataka
            var br_telefona_klijenta = $("#izmena_klijentovih_podataka_telefon").val();
            var ziro_racun_klijenta = $("#izmena_klijentovih_podataka_ziro_racun").val();      
            
             if(ime_firme_klijenta == "" || adresa_firme_klijenta == "" || pib_firme_klijenta == "" || maticni_br_firme_klijenta == "" || email_klijenta == "" || br_telefona_klijenta == "" || ziro_racun_klijenta == "")
           {
              alert('Molimo Vas popunite sva polja');
           }
           else
           {
            var verifikacija_izmena_podataka_klijenta = "verifikacija_izmena_podataka_klijenta";
        $.post("src/php/php_pocetna/handler_pocetna.php",{
              verifikacija_izmena_podataka_klijenta:verifikacija_izmena_podataka_klijenta,
              id_klijenta:id_klijenta,
              ime_firme_klijenta:ime_firme_klijenta,
              adresa_firme_klijenta:adresa_firme_klijenta,
              pib_firme_klijenta:pib_firme_klijenta,
              maticni_br_firme_klijenta:maticni_br_firme_klijenta,
              email_klijenta:email_klijenta,
              br_telefona_klijenta:br_telefona_klijenta,
              ziro_racun_klijenta:ziro_racun_klijenta

             },function(data,status){

               $('#modal_prikaz_odredjenog_klijenta_pre_uredjivanja').modal('toggle');  //zatvaranje modala

               $("#izmena_klijentovih_podataka_ime_firme").val('');
               $("#izmena_klijentovih_podataka_adresa_firme").val('');
               $("#izmena_klijentovih_podataka_pib_firme").val('');
               $("#izmena_klijentovih_podataka_maticni_br_firme").val(''); //praznjenje vrednosti inputa
               $("#izmena_klijentovih_podataka_email").val('');      //za moguci novi unos novog klijenta
               $("#izmena_klijentovih_podataka_telefon").val('');
               $("#izmena_klijentovih_podataka_ziro_racun").val('');
              
               window.pregled_svih_klijenta();
                $("#pregled_svih_klijenata").css("overflow-y","auto"); //dozvoljava skrolovanje...pravilo problem
              alert("Podaci uspesno promenjeni");
             })
           }
   })
}
window.izbrisi_odredjenog_klijenta = function(id_klijenta)
{
   if(confirm("Ovaj klijent i sve njegove fakture i svi podaci vezani za njega ce biti trajno obrisani! Da li ste sigurni?") == true){    //A AKO POSTOJI BRISEMO SVE VEZANO ZA TU VARIABLU IZ BAZE I VRACAMO NA POCETNU
               var verifikacija_obrisi_klijenta = "verifikacija_obrisi_klijenta";
            $.post("src/php/php_pocetna/handler_pocetna.php",{
                 id_klijenta:id_klijenta,
                 verifikacija_obrisi_klijenta:verifikacija_obrisi_klijenta,
            },function(){
                
                $("#prikaz_kklijenata_u_tabeli").DataTable().destroy();
                window.pregled_svih_klijenta();//osvezujemo stranicu
            })
           }
}



window.unos_novog_proizvoda = function()
{
     $("#unos_novog_proizvoda_sacuvaj").click(function(){

            var ime_proizvoda = $("#dodavanje_novog_proizvoda_ime").val(); 

            var verifikacija_provera_da_li_proizvod_postoji_u_bazi = "verifikacija_provera_da_li_proizvod_postoji_u_bazi";
        $.post("src/php/php_pocetna/handler_pocetna.php",{
            verifikacija_provera_da_li_proizvod_postoji_u_bazi:verifikacija_provera_da_li_proizvod_postoji_u_bazi,
            ime_proizvoda:ime_proizvoda,           
        },function(data,status){
          var data = jQuery.parseJSON(data);

         if(data != "")
         {
            alert('Proizvod sa ovim imenom vec postoji');
         }
         else
         {

         
       
            var sirina = $("#dodavanje_novog_proizvoda_sirina").val();
            var visina = $("#dodavanje_novog_proizvoda_visina").val();
            var duzina = $("#dodavanje_novog_proizvoda_duzina").val();
            var cena_po_kubiku = $("#dodavanje_novog_proizvoda_cena_po_kubiku").val(); 
            var cena_po_kubiku  = parseFloat(cena_po_kubiku).toFixed(2);
            var kubikaza = $("#dodavanje_novog_proizvoda_kubikaza").val();
            var donji_limit = $("#dodavanje_novog_proizvoda_limit").val();

       
            var visina = visina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
            var sirina = sirina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
                                         //duzina je vec u metrima
            var broj_komada = kubikaza / sirina / visina / duzina;
            var broj_komada = broj_komada.toFixed(2);
            var visina = visina * 100; 
            var visina =  visina.toFixed(0);  
            var sirina = sirina * 100;
            var sirina =  sirina.toFixed(0);

      
            var ukupna_vrednost_u_dinarima  = cena_po_kubiku * kubikaza;
            var ukupna_vrednost_u_dinarima =  ukupna_vrednost_u_dinarima.toFixed(2);

            var cena_po_komadu = ukupna_vrednost_u_dinarima / broj_komada;
            var cena_po_komadu =  cena_po_komadu.toFixed(2);

         if(ime_proizvoda == "" || sirina == "" || visina == "" || duzina == "" || cena_po_kubiku == "" || kubikaza == "")
       {
          alert('Molimo Vas popunite sva polja');
       }
       else
       {
        var verifikacija_unos_novog_proizvoda = "verifikacija_unos_novog_proizvoda";

        $.post("src/php/php_pocetna/handler_pocetna.php",{
            verifikacija_unos_novog_proizvoda:verifikacija_unos_novog_proizvoda,
            ime_proizvoda:ime_proizvoda,
            sirina:sirina,
            visina:visina,
            duzina:duzina,
            cena_po_komadu:cena_po_komadu,
            broj_komada:broj_komada,
            cena_po_kubiku:cena_po_kubiku,
            kubikaza:kubikaza,
            ukupna_vrednost_u_dinarima:ukupna_vrednost_u_dinarima,
            donji_limit:donji_limit
        },function(data,status){

          
             $('#modal_dodavanje_novog_proizvoda').modal('toggle');  //zatvaranje modala

             $("#dodavanje_novog_proizvoda_ime").val('');
             $("#dodavanje_novog_proizvoda_sirina").val('');
             $("#dodavanje_novog_proizvoda_visina").val('');
             $("#dodavanje_novog_proizvoda_duzina").val(''); //praznjenje vrednosti inputa
             $("#dodavanje_novog_proizvoda_cena_po_kubiku").val('');      //za moguci novi unos novog klijenta
             $("#dodavanje_novog_proizvoda_kubikaza").val('');
             $("#dodavanje_novog_proizvoda_limit").val('');
             
            
            $("#prikaz_magacina_u_tabeli").DataTable().destroy();
             window.pregled_magacina();
             window.pregled_ukupnih_vrednosti_magacina();
             alert("Proizvod uspesno dodat");
           
             
        })
       }
     }
       })
     });
}



window.pregled_magacina = function()
{

  var verifikacija_pregled_magacina = "verifikacija_pregled_magacina";

            $.post("src/php/php_pocetna/handler_pocetna.php",{
                verifikacija_pregled_magacina:verifikacija_pregled_magacina
            },function(data,status){
                
                var data = jQuery.parseJSON(data);
                               
                var rezultat = "";
                for(var i=0; i<data.length;i++)
                {
                      var donji_limit = data[i][11];
                      var ukupna_kubikaza = data[i][9];
                      var donji_limit =  parseFloat(donji_limit);
                      var ukupna_kubikaza =  parseFloat(ukupna_kubikaza);

                     if(ukupna_kubikaza > donji_limit)
                     {
                       rezultat +='<tr><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][11]+'&nbsp; m³</td><td>'+data[i][3]+'&nbsp; cm</td><td>'+data[i][4]+'&nbsp; cm</td><td>'+data[i][5]+'&nbsp; m</td><td>'+data[i][6]+'&nbsp; RSD</td><td>'+data[i][7]+'&nbsp; komada</td><td>'+data[i][8]+'&nbsp; RSD</td><td>'+data[i][9]+'&nbsp; m³</td><td>'+data[i][10]+'&nbsp; RSD</td><td><button id="uredi_proizvod" class="btn btn-warning" onClick="prikazi_odredjeni_proizvod_pre_uredjivanja('+data[i][1]+')">Uredi</button></td><td><button id="izbrisi_proizvod" class="btn btn-danger" onClick="izbrisi_proizvod('+data[i][1]+')">Izbriši</button></td></tr>';     
  
                     }
                     else
                     {
                       rezultat +='<tr style="background-color: darkgray;"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td style="border: 2px solid red;">'+data[i][11]+'&nbsp; m³</td><td>'+data[i][3]+'&nbsp; cm</td><td>'+data[i][4]+'&nbsp; cm</td><td>'+data[i][5]+'&nbsp; m</td><td>'+data[i][6]+'&nbsp; RSD</td><td>'+data[i][7]+'&nbsp; komada</td><td>'+data[i][8]+'&nbsp; RSD</td><td style="border: 2px solid red;">'+data[i][9]+'&nbsp; m³</td><td>'+data[i][10]+'&nbsp; RSD</td><td><button id="uredi_proizvod" class="btn btn-warning" onClick="prikazi_odredjeni_proizvod_pre_uredjivanja('+data[i][1]+')">Uredi</button></td><td><button id="izbrisi_proizvod" class="btn btn-danger" onClick="izbrisi_proizvod('+data[i][1]+')">Izbriši</button></td></tr>';     
                     }
                      
                }

                $("#prikaz_magacina_u_tabeli tbody").html(rezultat);
                $("#prikaz_magacina_u_tabeli").DataTable({      //OVIM DEFINISEMO DODATAK ZA TABELU
                               "language": {
                                   "lengthMenu": "Prikaži _MENU_",
                                   "zeroRecords": "Nema rezultata pretrage",
                                   "info": "Stranica _PAGE_ od ukupno _PAGES_",    //OVIM DEFINISEMO SRPSKI JEZIK U DODATKU
                                   "infoEmpty": "Nema rezultata",
                                   "infoFiltered": "(od ukupno _MAX_ faktura)",    //OVA DVA PREVODA SU MORALA OVDE DA STOJE JER MORAJU BITI TU ODMAH ISPOD UCITAVANJA
                                   "search":         "Pretraži magacin:",
                                   "paginate": {
                                               "first":      "Prva",
                                               "last":       "Poslednja",
                                               "next":       "Sledeca",
                                               "previous":   "Predhodna"
                                             },
                                         "loadingRecords": "Ucitavanje...",
                                         "loadingRecords": "Obrada..."
                                     },
                                     // "fixedHeader": true,
                                      "bSort": false,                                     
                                     "pagingType": "full_numbers",  //POKAZUJE SVE BROJEVE PAGINACIJE
                                     "retrieve": true,
                                     "scrollCollapse": true,
                                     "scrollY": "350px",
                                    // "scrollX": false,
                                     "paging":         true,
                                     "searching": true,
                                     "search": {
                                                  "search": ""
                                                }

                                            } );


             
            });
}
window.pregled_ukupnih_vrednosti_magacina = function()
{
  var verifikacija_pregled_ukupnih_vrednosti_magacina = "verifikacija_pregled_ukupnih_vrednosti_magacina";

            $.post("src/php/php_pocetna/handler_pocetna.php",{
                verifikacija_pregled_ukupnih_vrednosti_magacina:verifikacija_pregled_ukupnih_vrednosti_magacina
            },function(data,status){

               var data = jQuery.parseJSON(data);
             
             
                $("#ispis_ukupne_vrednosti_robe_na_stovaristu").html(data[0][1].toFixed(2));
                $("#ispis_ukupne_kubikaze_na_stovaristu").html(data[0][0].toFixed(2));
              
             
            });
}

window.prikazi_odredjeni_proizvod_pre_uredjivanja = function(id_proizvoda)
{          //funkcija pozvana od strane dinamicki stvorenog dugmeta

     $('#modal_prikaz_odredjenog_proizvoda_pre_uredjivanja').modal('toggle');

     var verifikacija_prikazi_odredjenog_proizvod_pre_uredjivanja = "verifikacija_prikazi_odredjenog_proizvod_pre_uredjivanja";
   $.post("src/php/php_pocetna/handler_pocetna.php",{
    verifikacija_prikazi_odredjenog_proizvod_pre_uredjivanja:verifikacija_prikazi_odredjenog_proizvod_pre_uredjivanja,
    id_proizvoda:id_proizvoda
  },function(data,status){

     var data = jQuery.parseJSON(data);

     $("#izmena_proizvoda_ime_proizvoda").val(data[0][1]);
     $("#izmena_proizvoda_sirina").val(data[0][2]);
     $("#izmena_proizvoda_visina").val(data[0][3]);
     $("#izmena_proizvoda_duzina").val(data[0][4]);
     $("#izmena_proizvoda_cena_po_kubiku").val(data[0][5]);     
     $("#izmena_podataka_ili_unos_robe_proizvoda_sacuvaj").val(data[0][0]); //dugmetu dodeljujemo vrednost id-a zeljenog proizvoda
     
     $("#skriven_prikaz_kubikaze_radi_daljeg_racunanja").val(data[0][6]); //skrivenom inputu dodeljujemo vrednost
                                                                      //kubikaze radi daljeg lakseg racunanja da ne
                                                                      // bi morali slati novi zahtev bazi samo za to
     $("#izmena_proizvoda_donji_limit").val(data[0][7]);
  })

}

window.uredjivanje_odredjenog_proizvoda = function()
{
  $("#izmena_podataka_ili_unos_robe_proizvoda_sacuvaj").click(function(){

        if($("#odabir_unosa_ili_izlaza_robe").val() == 'unos_robe')
        {

        
            var id_proizvoda = $("#izmena_podataka_ili_unos_robe_proizvoda_sacuvaj").val(); //ovde uzimamo vrednost id-a zeljenog proizvoda      
            var sirina = $("#izmena_proizvoda_sirina").val(); //uzimanje skrivene vrednosti inputa
            var visina = $("#izmena_proizvoda_visina").val(); //uzimanje skrivene vrednosti inputa
            var duzina = $("#izmena_proizvoda_duzina").val(); //uzimanje skrivene vrednosti inputa
            var cena_po_kubiku = $("#izmena_proizvoda_cena_po_kubiku").val();  
            var cena_po_kubiku  = parseFloat(cena_po_kubiku).toFixed(2);
        //    var cena_po_kubiku = cena_po_kubiku.toFixed(2);
            var kubikaza = $("#izmena_proizvoda_kubikaza").val();  

            var skrivena_kubikaza =  $("#skriven_prikaz_kubikaze_radi_daljeg_racunanja").val(); //uzimanje skrivene vrednosti inputa
            
            var donji_limit = $("#izmena_proizvoda_donji_limit").val(); 
             if(cena_po_kubiku == "")
           {
              alert('Polje cena po kubiku je obavezno');
           }
           else
           {
            if(kubikaza == "")
               {
                var visina = visina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
                var sirina = sirina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
                                             //duzina je vec u metrima
                var broj_komada = skrivena_kubikaza / sirina / visina / duzina;
                var broj_komada =  broj_komada.toFixed(2);
                var visina = visina * 100;   
                var sirina = sirina * 100;
        
                var ukupna_vrednost_u_dinarima  = cena_po_kubiku * skrivena_kubikaza;
                var ukupna_vrednost_u_dinarima =  ukupna_vrednost_u_dinarima.toFixed(2);

                var cena_po_komadu = ukupna_vrednost_u_dinarima / broj_komada;
                var cena_po_komadu =  cena_po_komadu.toFixed(2);

                var verifikacija_izmena_podataka_proizvoda = "verifikacija_izmena_podataka_proizvoda";
                $.post("src/php/php_pocetna/handler_pocetna.php",{
                verifikacija_izmena_podataka_proizvoda:verifikacija_izmena_podataka_proizvoda,
                id_proizvoda:id_proizvoda,
                cena_po_kubiku:cena_po_kubiku,
                cena_po_komadu:cena_po_komadu,
                ukupna_vrednost_u_dinarima:ukupna_vrednost_u_dinarima,
                donji_limit:donji_limit

                },function(data,status){

                $('#modal_prikaz_odredjenog_proizvoda_pre_uredjivanja').modal('toggle');  //zatvaranje modala
                window.pregled_magacina();
                window.pregled_ukupnih_vrednosti_magacina();
                $("#pregled_magacina_modal").css("overflow-y","auto"); //dozvoljava skrolovanje...pravilo problem
                alert("Podaci uspesno promenjeni");
                })
               }
            else
               {
                var novi_unos_kubikaza = parseFloat(skrivena_kubikaza) + parseFloat(kubikaza);

                var visina = visina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
                var sirina = sirina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
                                             //duzina je vec u metrima
                var broj_komada = novi_unos_kubikaza / sirina / visina / duzina;
                var broj_komada =  broj_komada.toFixed(2);
                var visina = visina * 100;   
                var sirina = sirina * 100;
        
                var ukupna_vrednost_u_dinarima  = cena_po_kubiku * novi_unos_kubikaza;
                var ukupna_vrednost_u_dinarima =  ukupna_vrednost_u_dinarima.toFixed(2);

                var cena_po_komadu = ukupna_vrednost_u_dinarima / broj_komada;
                var cena_po_komadu =  cena_po_komadu.toFixed(2);
                var novi_unos_kubikaza =  novi_unos_kubikaza.toFixed(2);

                var verifikacija_izmena_podataka_proizvoda_promenjena_kubikaza = "verifikacija_izmena_podataka_proizvoda_promenjena_kubikaza";
                $.post("src/php/php_pocetna/handler_pocetna.php",{
                verifikacija_izmena_podataka_proizvoda_promenjena_kubikaza:verifikacija_izmena_podataka_proizvoda_promenjena_kubikaza,
                id_proizvoda:id_proizvoda,
                cena_po_kubiku:cena_po_kubiku,
                cena_po_komadu:cena_po_komadu,
                ukupna_vrednost_u_dinarima:ukupna_vrednost_u_dinarima,
                novi_unos_kubikaza:novi_unos_kubikaza,
                broj_komada:broj_komada,
                donji_limit:donji_limit

                },function(data,status){

                $('#modal_prikaz_odredjenog_proizvoda_pre_uredjivanja').modal('toggle');  //zatvaranje modala
                $("#izmena_proizvoda_kubikaza").val('');
                window.pregled_magacina();
                window.pregled_ukupnih_vrednosti_magacina();
                $("#pregled_magacina_modal").css("overflow-y","auto"); //dozvoljava skrolovanje...pravilo problem
                alert("Podaci uspesno promenjeni");
                })
               }
           }
         }
         else if($("#odabir_unosa_ili_izlaza_robe").val() == 'izlaz_robe')
         {
            var id_proizvoda = $("#izmena_podataka_ili_unos_robe_proizvoda_sacuvaj").val(); //ovde uzimamo vrednost id-a zeljenog proizvoda      
            var sirina = $("#izmena_proizvoda_sirina").val(); //uzimanje skrivene vrednosti inputa
            var visina = $("#izmena_proizvoda_visina").val(); //uzimanje skrivene vrednosti inputa
            var duzina = $("#izmena_proizvoda_duzina").val(); //uzimanje skrivene vrednosti inputa
            var cena_po_kubiku = $("#izmena_proizvoda_cena_po_kubiku").val();
            var cena_po_kubiku  = parseFloat(cena_po_kubiku).toFixed(2);
         //   var cena_po_kubiku = cena_po_kubiku.toFixed(2);
            var kubikaza = $("#izmena_proizvoda_kubikaza").val();  

            var skrivena_kubikaza =  $("#skriven_prikaz_kubikaze_radi_daljeg_racunanja").val(); //uzimanje skrivene vrednosti inputa
            
            var donji_limit = $("#izmena_proizvoda_donji_limit").val(); 
             if(cena_po_kubiku == "")
           {
              alert('Polje cena po kubiku je obavezno');
           }
           else
           {
            if(kubikaza == "")
               {
                var visina = visina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
                var sirina = sirina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
                                             //duzina je vec u metrima
                var broj_komada = skrivena_kubikaza / sirina / visina / duzina;
                var broj_komada =  broj_komada.toFixed(2);
                var visina = visina * 100;   
                var sirina = sirina * 100;
        
                var ukupna_vrednost_u_dinarima  = cena_po_kubiku * skrivena_kubikaza;
                var ukupna_vrednost_u_dinarima =  ukupna_vrednost_u_dinarima.toFixed(2);

                var cena_po_komadu = ukupna_vrednost_u_dinarima / broj_komada;
                var cena_po_komadu =  cena_po_komadu.toFixed(2);

                var verifikacija_izmena_podataka_proizvoda = "verifikacija_izmena_podataka_proizvoda";
                $.post("src/php/php_pocetna/handler_pocetna.php",{
                verifikacija_izmena_podataka_proizvoda:verifikacija_izmena_podataka_proizvoda,
                id_proizvoda:id_proizvoda,
                cena_po_kubiku:cena_po_kubiku,
                cena_po_komadu:cena_po_komadu,
                ukupna_vrednost_u_dinarima:ukupna_vrednost_u_dinarima,
                donji_limit:donji_limit

                },function(data,status){

                $('#modal_prikaz_odredjenog_proizvoda_pre_uredjivanja').modal('toggle');  //zatvaranje modala
                window.pregled_magacina();
                window.pregled_ukupnih_vrednosti_magacina();
                $("#pregled_magacina_modal").css("overflow-y","auto"); //dozvoljava skrolovanje...pravilo problem
                alert("Podaci uspesno promenjeni");
                })
               }
            else
               {                
                var novi_unos_kubikaza = parseFloat(skrivena_kubikaza) - parseFloat(kubikaza);

                if(novi_unos_kubikaza < 0)
                {
                  alert("Kubikaža ne može biti manja od 0");
                  $("#izmena_proizvoda_kubikaza").val('')                  
                }
                else
                {
                var visina = visina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
                var sirina = sirina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
                                             //duzina je vec u metrima
                var broj_komada = novi_unos_kubikaza / sirina / visina / duzina;
                var broj_komada =  broj_komada.toFixed(2);
                var visina = visina * 100;   
                var sirina = sirina * 100;
        
                var ukupna_vrednost_u_dinarima  = cena_po_kubiku * novi_unos_kubikaza;
                var ukupna_vrednost_u_dinarima =  ukupna_vrednost_u_dinarima.toFixed(2);

                var cena_po_komadu = ukupna_vrednost_u_dinarima / broj_komada;
                var cena_po_komadu =  cena_po_komadu.toFixed(2);
                var novi_unos_kubikaza =  novi_unos_kubikaza.toFixed(2);

                var verifikacija_izmena_podataka_proizvoda_promenjena_kubikaza = "verifikacija_izmena_podataka_proizvoda_promenjena_kubikaza";
                $.post("src/php/php_pocetna/handler_pocetna.php",{
                verifikacija_izmena_podataka_proizvoda_promenjena_kubikaza:verifikacija_izmena_podataka_proizvoda_promenjena_kubikaza,
                id_proizvoda:id_proizvoda,
                cena_po_kubiku:cena_po_kubiku,
                cena_po_komadu:cena_po_komadu,
                ukupna_vrednost_u_dinarima:ukupna_vrednost_u_dinarima,
                novi_unos_kubikaza:novi_unos_kubikaza,
                broj_komada:broj_komada,
                donji_limit:donji_limit

                },function(data,status){

                $('#modal_prikaz_odredjenog_proizvoda_pre_uredjivanja').modal('toggle');  //zatvaranje modala
                $("#izmena_proizvoda_kubikaza").val('');
                window.pregled_magacina();
                window.pregled_ukupnih_vrednosti_magacina();
                $("#pregled_magacina_modal").css("overflow-y","auto"); //dozvoljava skrolovanje...pravilo problem
                alert("Podaci uspesno promenjeni");
                })
               }
             }
           }
         }

           })
}


window.izbrisi_proizvod = function(id_proizvoda)
{
   if(confirm("Ovaj proizvod ce biti trajno obrisan! Da li ste sigurni?") == true){    //A AKO POSTOJI BRISEMO SVE VEZANO ZA TU VARIABLU IZ BAZE I VRACAMO NA POCETNU
               var verifikacija_obrisi_proizvod = "verifikacija_obrisi_proizvod";
            $.post("src/php/php_pocetna/handler_pocetna.php",{
                 id_proizvoda:id_proizvoda,
                 verifikacija_obrisi_proizvod:verifikacija_obrisi_proizvod,
            },function(){
              
              $("#prikaz_magacina_u_tabeli").DataTable().destroy();
              window.pregled_magacina();
              window.pregled_ukupnih_vrednosti_magacina();  //osvezujemo stranicu
            })
           }
}

window.pravljenje_nove_fakture = function()
{
  $("#pravljenje_nove_fakture").click(function(){
  
                 window.location.href = 'stranice/pravljenje_nove_fakture.php';
  })
}


window.prikaz_ukupne_vrednosti_faktura = function()
{
  

      
      window.prikaz_ukupne_vrednosti_faktura_za_opciju_sve_ukupno = function()
      {
       var verifikacija_uzimanje_ukupnog_broja_redova_faktura = "verifikacija_uzimanje_ukupnog_broja_redova_faktura";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_uzimanje_ukupnog_broja_redova_faktura:verifikacija_uzimanje_ukupnog_broja_redova_faktura,
                 
            },function(data,status){
              var data = jQuery.parseJSON(data);
              broj_redova_faktura = data[0][0];

                     });



        //SVE UKUPNE FAKTURE IZVRSENE
       var verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura = "verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura:verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura,
                 
            },function(data,status){
              var data = jQuery.parseJSON(data);
              
              var poreska_osnovica_svih_izvrsenih_faktura = "";
              var ukupan_pdv_izvrsenih_faktura = "";
              var ukupna_vrednost_izvrsenih_faktura = "";
                for(var i=0; i<data.length;i++)
                {
                  poreska_osnovica_svih_izvrsenih_faktura = parseFloat(data[i][0]).toFixed(2);
                  ukupan_pdv_izvrsenih_faktura = parseFloat(data[i][1]).toFixed(2);
                  ukupna_vrednost_izvrsenih_faktura = parseFloat(data[i][2]).toFixed(2);
                }

                if(poreska_osnovica_svih_izvrsenih_faktura == "NaN")
                 {
                  poreska_osnovica_svih_izvrsenih_faktura = 0;
                 }
                 if(ukupan_pdv_izvrsenih_faktura == "NaN")
                 {
                  ukupan_pdv_izvrsenih_faktura = 0;
                 }
                 if(ukupna_vrednost_izvrsenih_faktura == "NaN")
                 {
                  ukupna_vrednost_izvrsenih_faktura = 0;
                 }
              
               $("#span_ukupan_pdv_faktura_placenih").html(ukupan_pdv_izvrsenih_faktura);
               $("#span_ukupna_poreska_osnovica_svih_faktura_placenih").html(poreska_osnovica_svih_izvrsenih_faktura);
               $("#span_ukupna_vrednost_faktura_placenih").html(ukupna_vrednost_izvrsenih_faktura);
                

               var verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih = "verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih:verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih,
                 
            },function(data,status){
              var data = jQuery.parseJSON(data);
              broj_redova_faktura_izvrsenih = data[0][0];

              var vrednost_procenta = broj_redova_faktura_izvrsenih / broj_redova_faktura;
              var vrednost_procenta = vrednost_procenta * 100;

              
                $('#procenat_izvrsene').circleProgress({
                                                max: 100,
                                                value: vrednost_procenta,
                                                textFormat: 'percent',
                                               });  //POZIVANJE PRIKAZA PROCENTA
                     });



                });
     //SVE UKUPNE FAKTURE ISZRSENE

     //SVE UKUPNE FAKTURE NA CEKANJU
       var verifikacija_prikaz_ukupne_vrednosti_faktura_na_cekanju = "verifikacija_prikaz_ukupne_vrednosti_faktura_na_cekanju";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_prikaz_ukupne_vrednosti_faktura_na_cekanju:verifikacija_prikaz_ukupne_vrednosti_faktura_na_cekanju,
                 
            },function(data,status){
              var data = jQuery.parseJSON(data);
              
              var poreska_osnovica_svih_faktura_na_cekanju = "";
              var ukupan_pdv_faktura_na_cekanju = "";
              var ukupna_vrednost_faktura_na_cekanju = "";
                for(var i=0; i<data.length;i++)
                {
                  poreska_osnovica_svih_faktura_na_cekanju = parseFloat(data[i][0]).toFixed(2);
                  ukupan_pdv_faktura_na_cekanju = parseFloat(data[i][1]).toFixed(2);
                  ukupna_vrednost_faktura_na_cekanju = parseFloat(data[i][2]).toFixed(2);
                }

                if(poreska_osnovica_svih_faktura_na_cekanju == "NaN")
                 {
                  poreska_osnovica_svih_faktura_na_cekanju = 0;
                 }
                 if(ukupan_pdv_faktura_na_cekanju == "NaN")
                 {
                  ukupan_pdv_faktura_na_cekanju = 0;
                 }
                 if(ukupna_vrednost_faktura_na_cekanju == "NaN")
                 {
                  ukupna_vrednost_faktura_na_cekanju = 0;
                 }
              
               $("#span_ukupan_pdv_faktura_ne_placenih").html(ukupan_pdv_faktura_na_cekanju);
               $("#span_ukupna_poreska_osnovica_svih_faktura_ne_placenih").html(poreska_osnovica_svih_faktura_na_cekanju);
               $("#span_ukupna_vrednost_faktura_ne_placenih").html(ukupna_vrednost_faktura_na_cekanju);
               

               var verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju = "verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju:verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju,
                 
            },function(data,status){
              var data = jQuery.parseJSON(data);
              broj_redova_faktura_izvrsenih = data[0][0];

              var vrednost_procenta = broj_redova_faktura_izvrsenih / broj_redova_faktura;
              var vrednost_procenta = vrednost_procenta * 100;

              
                $('#procenat_na_cekanju').circleProgress({
                                                max: 100,
                                                value: vrednost_procenta,
                                                textFormat: 'percent',
                                               });  //POZIVANJE PRIKAZA PROCENTA
                     });


                });
     //SVE UKUPNE FAKTURE NA CEKANJU

     //SVE FAKTURE ZAJEDNO UKUPNO
       var verifikacija_prikaz_ukupne_vrednosti_faktura = "verifikacija_prikaz_ukupne_vrednosti_faktura";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_prikaz_ukupne_vrednosti_faktura:verifikacija_prikaz_ukupne_vrednosti_faktura,
                 
            },function(data,status){
              var data = jQuery.parseJSON(data);
              
              var poreska_osnovica_svih_faktura = "";
              var ukupan_pdv_faktura = "";
              var ukupna_vrednost_faktura = "";
                for(var i=0; i<data.length;i++)
                {
                  poreska_osnovica_svih_faktura = parseFloat(data[i][0]).toFixed(2);
                  ukupan_pdv_faktura = parseFloat(data[i][1]).toFixed(2);
                  ukupna_vrednost_faktura = parseFloat(data[i][2]).toFixed(2);
                }

                if(poreska_osnovica_svih_faktura == "NaN")
                 {
                  poreska_osnovica_svih_faktura = 0;
                 }
                 if(ukupan_pdv_faktura == "NaN")
                 {
                  ukupan_pdv_faktura = 0;
                 }
                 if(ukupna_vrednost_faktura == "NaN")
                 {
                  ukupna_vrednost_faktura = 0;
                 }
              
               $("#span_ukupan_pdv_svih_faktura").html(ukupan_pdv_faktura);
               $("#span_ukupna_poreska_osnovica_svih_faktura").html(poreska_osnovica_svih_faktura);
               $("#span_ukupna_vrednost_svih_faktura").html(ukupna_vrednost_faktura);
              

                });
      //SVE FAKTURE ZAJEDNO UKUPNO

      }

    
$("#select_odabir_godine_ili_sve_ukupno_za_prikaz_vrednosti").change( window.prikaz_vrednosti_faktura = function(){
  

      var vrednost_selecta = $("#select_odabir_godine_ili_sve_ukupno_za_prikaz_vrednosti").val();
      var vrednost_selecta_ime_klijenta = $("#select_odabir_klijenti_ili_sve_ukupno_za_prikaz_vrednosti").val();

if(vrednost_selecta == "sve_ukupno" && vrednost_selecta_ime_klijenta == "sve_ukupno_klijenti")
      {
        window.prikaz_ukupne_vrednosti_faktura_za_opciju_sve_ukupno();
      }
else if(vrednost_selecta != "sve_ukupno" && vrednost_selecta_ime_klijenta == "sve_ukupno_klijenti")
      {//alert('godina i sve ukupno ');

        var verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenu_godinu = "verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenu_godinu";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenu_godinu:verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenu_godinu,
                 vrednost_selecta:vrednost_selecta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              broj_redova_faktura = data[0][0];

                     });


      //UKUPNA VREDNOST FAKTURA PO GODINAMA IZVRSENE
       var verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_po_godinama = "verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_po_godinama";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_po_godinama:verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_po_godinama,
                 vrednost_selecta:vrednost_selecta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              
              var poreska_osnovica_svih_izvrsenih_faktura_po_godinama = "";
              var ukupan_pdv_izvrsenih_faktura_po_godinama = "";
              var ukupna_vrednost_izvrsenih_faktura_po_godinama = "";
                for(var i=0; i<data.length;i++)
                {
                  poreska_osnovica_svih_izvrsenih_faktura_po_godinama = parseFloat(data[i][0]).toFixed(2);
                  ukupan_pdv_izvrsenih_faktura_po_godinama = parseFloat(data[i][1]).toFixed(2);
                  ukupna_vrednost_izvrsenih_faktura_po_godinama = parseFloat(data[i][2]).toFixed(2);
                }

                if(poreska_osnovica_svih_izvrsenih_faktura_po_godinama == "NaN")
                 {
                  poreska_osnovica_svih_izvrsenih_faktura_po_godinama = 0;
                 }
                 if(ukupan_pdv_izvrsenih_faktura_po_godinama == "NaN")
                 {
                  ukupan_pdv_izvrsenih_faktura_po_godinama = 0;
                 }
                 if(ukupna_vrednost_izvrsenih_faktura_po_godinama == "NaN")
                 {
                  ukupna_vrednost_izvrsenih_faktura_po_godinama = 0;
                 }
              
               $("#span_ukupan_pdv_faktura_placenih").html(ukupan_pdv_izvrsenih_faktura_po_godinama);
               $("#span_ukupna_poreska_osnovica_svih_faktura_placenih").html(poreska_osnovica_svih_izvrsenih_faktura_po_godinama);
               $("#span_ukupna_vrednost_faktura_placenih").html(ukupna_vrednost_izvrsenih_faktura_po_godinama);
                

                var verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_po_godinima = "verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_po_godinima";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_po_godinima:verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_po_godinima,
                 vrednost_selecta:vrednost_selecta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              broj_redova_faktura_izvrsenih = data[0][0];

              var vrednost_procenta = broj_redova_faktura_izvrsenih / broj_redova_faktura;
              var vrednost_procenta = vrednost_procenta * 100;

              
                $('#procenat_izvrsene').circleProgress({
                                                max: 100,
                                                value: vrednost_procenta,
                                                textFormat: 'percent',
                                               });  //POZIVANJE PRIKAZA PROCENTA
                     });



                });
     //UKUPNA VREDNOST FAKTURA PO GODINAMA IZVRSENE

     //UKUPNA VREDNOST FAKTURA PO GODINAMA NA CEKANJU
       var verifikacija_prikaz_ukupne_vrednosti_faktura_na_cekanju_po_godinama = "verifikacija_prikaz_ukupne_vrednosti_faktura_na_cekanju_po_godinama";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_prikaz_ukupne_vrednosti_faktura_na_cekanju_po_godinama:verifikacija_prikaz_ukupne_vrednosti_faktura_na_cekanju_po_godinama,
                 vrednost_selecta:vrednost_selecta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              
              var poreska_osnovica_svih_faktura_na_cekanju_po_godinama = "";
              var ukupan_pdv_faktura_na_cekanju_po_godinama = "";
              var ukupna_vrednost_faktura_na_cekanju_po_godinama = "";
                for(var i=0; i<data.length;i++)
                {
                  poreska_osnovica_svih_faktura_na_cekanju_po_godinama = parseFloat(data[i][0]).toFixed(2);
                  ukupan_pdv_faktura_na_cekanju_po_godinama = parseFloat(data[i][1]).toFixed(2);
                  ukupna_vrednost_faktura_na_cekanju_po_godinama = parseFloat(data[i][2]).toFixed(2);
                }
                 if(poreska_osnovica_svih_faktura_na_cekanju_po_godinama == "NaN")
                 {
                  poreska_osnovica_svih_faktura_na_cekanju_po_godinama = 0;
                 }
                 if(ukupan_pdv_faktura_na_cekanju_po_godinama == "NaN")
                 {
                  ukupan_pdv_faktura_na_cekanju_po_godinama = 0;
                 }
                 if(ukupna_vrednost_faktura_na_cekanju_po_godinama == "NaN")
                 {
                  ukupna_vrednost_faktura_na_cekanju_po_godinama = 0;
                 }
               $("#span_ukupan_pdv_faktura_ne_placenih").html(ukupan_pdv_faktura_na_cekanju_po_godinama);
               $("#span_ukupna_poreska_osnovica_svih_faktura_ne_placenih").html(poreska_osnovica_svih_faktura_na_cekanju_po_godinama);
               $("#span_ukupna_vrednost_faktura_ne_placenih").html(ukupna_vrednost_faktura_na_cekanju_po_godinama);
              

              var verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_po_godinima = "verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_po_godinima";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_po_godinima:verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_po_godinima,
                 vrednost_selecta:vrednost_selecta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              broj_redova_faktura_izvrsenih = data[0][0];

              var vrednost_procenta = broj_redova_faktura_izvrsenih / broj_redova_faktura;
              var vrednost_procenta = vrednost_procenta * 100;

              
                $('#procenat_na_cekanju').circleProgress({
                                                max: 100,
                                                value: vrednost_procenta,
                                                textFormat: 'percent',
                                               });  //POZIVANJE PRIKAZA PROCENTA
                     });

                });
     //UKUPNA VREDNOST FAKTURA PO GODINAMA NA CEKANJU

     //UKUPNA VREDNOST FAKTURA PO GODINAMA SVE ZAJEDNO
       var verifikacija_prikaz_ukupne_vrednosti_faktura_po_godinama = "verifikacija_prikaz_ukupne_vrednosti_faktura_po_godinama";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_prikaz_ukupne_vrednosti_faktura_po_godinama:verifikacija_prikaz_ukupne_vrednosti_faktura_po_godinama,
                 vrednost_selecta:vrednost_selecta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              
              var poreska_osnovica_svih_faktura_po_godinama = "";
              var ukupan_pdv_faktura_po_godinama = "";
              var ukupna_vrednost_faktura_po_godinama = "";
                for(var i=0; i<data.length;i++)
                {
                  poreska_osnovica_svih_faktura_po_godinama = parseFloat(data[i][0]).toFixed(2);
                  ukupan_pdv_faktura_po_godinama = parseFloat(data[i][1]).toFixed(2);
                  ukupna_vrednost_faktura_po_godinama = parseFloat(data[i][2]).toFixed(2);
                }
                  if(poreska_osnovica_svih_faktura_po_godinama == "NaN")
                 {
                  poreska_osnovica_svih_faktura_po_godinama = 0;
                 }
                 if(ukupan_pdv_faktura_po_godinama == "NaN")
                 {
                  ukupan_pdv_faktura_po_godinama = 0;
                 }
                 if(ukupna_vrednost_faktura_po_godinama == "NaN")
                 {
                  ukupna_vrednost_faktura_po_godinama = 0;
                 }
             
              
               $("#span_ukupan_pdv_svih_faktura").html(ukupan_pdv_faktura_po_godinama);
               $("#span_ukupna_poreska_osnovica_svih_faktura").html(poreska_osnovica_svih_faktura_po_godinama);
               $("#span_ukupna_vrednost_svih_faktura").html(ukupna_vrednost_faktura_po_godinama);
              

                });
      //UKUPNA VREDNOST FAKTURA PO GODINAMA SVE ZAJEDNO


     }



else if(vrednost_selecta == "sve_ukupno" && vrednost_selecta_ime_klijenta != "sve_ukupno_klijenti")
     {
      //  alert('sve ukupno i ime ');

      var verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta = "verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta:verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta,
                 vrednost_selecta_ime_klijenta:vrednost_selecta_ime_klijenta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              broj_redova_faktura = data[0][0];

                     });



        //UKUPNA VREDNOST FAKTURA SVE GODINE I ODREDJENI KLIJENT - IZVRSENE
       var verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_za_sve_godine_i_odredjeni_klijent = "verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_za_sve_godine_i_odredjeni_klijent";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_za_sve_godine_i_odredjeni_klijent:verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_za_sve_godine_i_odredjeni_klijent,
                 vrednost_selecta:vrednost_selecta,
                 vrednost_selecta_ime_klijenta:vrednost_selecta_ime_klijenta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              
              var poreska_osnovica_svih_izvrsenih_faktura_po_godinama = "";
              var ukupan_pdv_izvrsenih_faktura_po_godinama = "";
              var ukupna_vrednost_izvrsenih_faktura_po_godinama = "";
                for(var i=0; i<data.length;i++)
                {
                  poreska_osnovica_svih_izvrsenih_faktura_po_godinama = parseFloat(data[i][0]).toFixed(2);
                  ukupan_pdv_izvrsenih_faktura_po_godinama = parseFloat(data[i][1]).toFixed(2);
                  ukupna_vrednost_izvrsenih_faktura_po_godinama = parseFloat(data[i][2]).toFixed(2);
                }

                if(poreska_osnovica_svih_izvrsenih_faktura_po_godinama == "NaN")
                 {
                  poreska_osnovica_svih_izvrsenih_faktura_po_godinama = 0;
                 }
                 if(ukupan_pdv_izvrsenih_faktura_po_godinama == "NaN")
                 {
                  ukupan_pdv_izvrsenih_faktura_po_godinama = 0;
                 }
                 if(ukupna_vrednost_izvrsenih_faktura_po_godinama == "NaN")
                 {
                  ukupna_vrednost_izvrsenih_faktura_po_godinama = 0;
                 }
              
               $("#span_ukupan_pdv_faktura_placenih").html(ukupan_pdv_izvrsenih_faktura_po_godinama);
               $("#span_ukupna_poreska_osnovica_svih_faktura_placenih").html(poreska_osnovica_svih_izvrsenih_faktura_po_godinama);
               $("#span_ukupna_vrednost_faktura_placenih").html(ukupna_vrednost_izvrsenih_faktura_po_godinama);
               

               var verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent = "verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent:verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent,
                 vrednost_selecta:vrednost_selecta,
                 vrednost_selecta_ime_klijenta:vrednost_selecta_ime_klijenta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              broj_redova_faktura_izvrsenih = data[0][0];

              var vrednost_procenta = broj_redova_faktura_izvrsenih / broj_redova_faktura;
              var vrednost_procenta = vrednost_procenta * 100;

                $('#procenat_izvrsene').circleProgress({
                                                max: 100,
                                                value: vrednost_procenta,
                                                textFormat: 'percent',
                                               });  //POZIVANJE PRIKAZA PROCENTA
                     });



                });
     //UKUPNA VREDNOST FAKTURA SVE GODINE I ODREDJENI KLIJENT - IZVRSENE

     //UKUPNA VREDNOST FAKTURA PO GODINAMA NA CEKANJU
       var verifikacija_prikaz_ukupne_vrednosti_na_cekanju_faktura_za_sve_godine_i_odredjeni_klijent = "verifikacija_prikaz_ukupne_vrednosti_na_cekanju_faktura_za_sve_godine_i_odredjeni_klijent";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_prikaz_ukupne_vrednosti_na_cekanju_faktura_za_sve_godine_i_odredjeni_klijent:verifikacija_prikaz_ukupne_vrednosti_na_cekanju_faktura_za_sve_godine_i_odredjeni_klijent,
                 vrednost_selecta:vrednost_selecta,
                 vrednost_selecta_ime_klijenta:vrednost_selecta_ime_klijenta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              
              var poreska_osnovica_svih_faktura_na_cekanju_po_godinama = "";
              var ukupan_pdv_faktura_na_cekanju_po_godinama = "";
              var ukupna_vrednost_faktura_na_cekanju_po_godinama = "";
                for(var i=0; i<data.length;i++)
                {
                  poreska_osnovica_svih_faktura_na_cekanju_po_godinama = parseFloat(data[i][0]).toFixed(2);
                  ukupan_pdv_faktura_na_cekanju_po_godinama = parseFloat(data[i][1]).toFixed(2);
                  ukupna_vrednost_faktura_na_cekanju_po_godinama = parseFloat(data[i][2]).toFixed(2);
                }
                 if(poreska_osnovica_svih_faktura_na_cekanju_po_godinama == "NaN")
                 {
                  poreska_osnovica_svih_faktura_na_cekanju_po_godinama = 0;
                 }
                 if(ukupan_pdv_faktura_na_cekanju_po_godinama == "NaN")
                 {
                  ukupan_pdv_faktura_na_cekanju_po_godinama = 0;
                 }
                 if(ukupna_vrednost_faktura_na_cekanju_po_godinama == "NaN")
                 {
                  ukupna_vrednost_faktura_na_cekanju_po_godinama = 0;
                 }
               $("#span_ukupan_pdv_faktura_ne_placenih").html(ukupan_pdv_faktura_na_cekanju_po_godinama);
               $("#span_ukupna_poreska_osnovica_svih_faktura_ne_placenih").html(poreska_osnovica_svih_faktura_na_cekanju_po_godinama);
               $("#span_ukupna_vrednost_faktura_ne_placenih").html(ukupna_vrednost_faktura_na_cekanju_po_godinama);
              
                
                var verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent = "verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent:verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent,
                 vrednost_selecta:vrednost_selecta,
                 vrednost_selecta_ime_klijenta:vrednost_selecta_ime_klijenta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              broj_redova_faktura_izvrsenih = data[0][0];

              var vrednost_procenta = broj_redova_faktura_izvrsenih / broj_redova_faktura;
              var vrednost_procenta = vrednost_procenta * 100;

              
                $('#procenat_na_cekanju').circleProgress({
                                                max: 100,
                                                value: vrednost_procenta,
                                                textFormat: 'percent',
                                               });  //POZIVANJE PRIKAZA PROCENTA
                     });

                });
     //UKUPNA VREDNOST FAKTURA PO GODINAMA NA CEKANJU

     //UKUPNA VREDNOST FAKTURA PO GODINAMA SVE ZAJEDNO
       var verifikacija_prikaz_ukupne_vrednosti_ukupno_faktura_za_sve_godine_i_odredjeni_klijent = "verifikacija_prikaz_ukupne_vrednosti_ukupno_faktura_za_sve_godine_i_odredjeni_klijent";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_prikaz_ukupne_vrednosti_ukupno_faktura_za_sve_godine_i_odredjeni_klijent:verifikacija_prikaz_ukupne_vrednosti_ukupno_faktura_za_sve_godine_i_odredjeni_klijent,
                 vrednost_selecta:vrednost_selecta,
                 vrednost_selecta_ime_klijenta:vrednost_selecta_ime_klijenta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              
              var poreska_osnovica_svih_faktura_po_godinama = "";
              var ukupan_pdv_faktura_po_godinama = "";
              var ukupna_vrednost_faktura_po_godinama = "";
                for(var i=0; i<data.length;i++)
                {
                  poreska_osnovica_svih_faktura_po_godinama = parseFloat(data[i][0]).toFixed(2);
                  ukupan_pdv_faktura_po_godinama = parseFloat(data[i][1]).toFixed(2);
                  ukupna_vrednost_faktura_po_godinama = parseFloat(data[i][2]).toFixed(2);
                }
                  if(poreska_osnovica_svih_faktura_po_godinama == "NaN")
                 {
                  poreska_osnovica_svih_faktura_po_godinama = 0;
                 }
                 if(ukupan_pdv_faktura_po_godinama == "NaN")
                 {
                  ukupan_pdv_faktura_po_godinama = 0;
                 }
                 if(ukupna_vrednost_faktura_po_godinama == "NaN")
                 {
                  ukupna_vrednost_faktura_po_godinama = 0;
                 }
             
              
               $("#span_ukupan_pdv_svih_faktura").html(ukupan_pdv_faktura_po_godinama);
               $("#span_ukupna_poreska_osnovica_svih_faktura").html(poreska_osnovica_svih_faktura_po_godinama);
               $("#span_ukupna_vrednost_svih_faktura").html(ukupna_vrednost_faktura_po_godinama);
              

                });
      //UKUPNA VREDNOST FAKTURA PO GODINAMA SVE ZAJEDNO
     }



else if(vrednost_selecta != "sve_ukupno" && vrednost_selecta_ime_klijenta != "sve_ukupno_klijenti")
     {
     // alert('godina i ime ');

     var verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta_i_odredjenu_godinu = "verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta_i_odredjenu_godinu";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta_i_odredjenu_godinu:verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta_i_odredjenu_godinu,
                 vrednost_selecta:vrednost_selecta,
                 vrednost_selecta_ime_klijenta:vrednost_selecta_ime_klijenta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              broj_redova_faktura = data[0][0];

                     });

      //UKUPNA VREDNOST FAKTURA ODREDJENA GODINA I ODREDJENI KLIJENT - IZVRSENE
       var verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_za_odredjenu_godinu_i_odredjeni_klijent = "verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_za_odredjenu_godinu_i_odredjeni_klijent";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_za_odredjenu_godinu_i_odredjeni_klijent:verifikacija_prikaz_ukupne_vrednosti_izvrsenih_faktura_za_odredjenu_godinu_i_odredjeni_klijent,
                 vrednost_selecta:vrednost_selecta,
                 vrednost_selecta_ime_klijenta:vrednost_selecta_ime_klijenta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              
              var poreska_osnovica_svih_izvrsenih_faktura_po_godinama = "";
              var ukupan_pdv_izvrsenih_faktura_po_godinama = "";
              var ukupna_vrednost_izvrsenih_faktura_po_godinama = "";
                for(var i=0; i<data.length;i++)
                {
                  poreska_osnovica_svih_izvrsenih_faktura_po_godinama = parseFloat(data[i][0]).toFixed(2);
                  ukupan_pdv_izvrsenih_faktura_po_godinama = parseFloat(data[i][1]).toFixed(2);
                  ukupna_vrednost_izvrsenih_faktura_po_godinama = parseFloat(data[i][2]).toFixed(2);
                }

                if(poreska_osnovica_svih_izvrsenih_faktura_po_godinama == "NaN")
                 {
                  poreska_osnovica_svih_izvrsenih_faktura_po_godinama = 0;
                 }
                 if(ukupan_pdv_izvrsenih_faktura_po_godinama == "NaN")
                 {
                  ukupan_pdv_izvrsenih_faktura_po_godinama = 0;
                 }
                 if(ukupna_vrednost_izvrsenih_faktura_po_godinama == "NaN")
                 {
                  ukupna_vrednost_izvrsenih_faktura_po_godinama = 0;
                 }
              
               $("#span_ukupan_pdv_faktura_placenih").html(ukupan_pdv_izvrsenih_faktura_po_godinama);
               $("#span_ukupna_poreska_osnovica_svih_faktura_placenih").html(poreska_osnovica_svih_izvrsenih_faktura_po_godinama);
               $("#span_ukupna_vrednost_faktura_placenih").html(ukupna_vrednost_izvrsenih_faktura_po_godinama);
               

               var verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent_i_odredjena_godina = "verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent_i_odredjena_godina";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent_i_odredjena_godina:verifikacija_uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent_i_odredjena_godina,
                 vrednost_selecta:vrednost_selecta,
                 vrednost_selecta_ime_klijenta:vrednost_selecta_ime_klijenta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              broj_redova_faktura_izvrsenih = data[0][0];

              var vrednost_procenta = broj_redova_faktura_izvrsenih / broj_redova_faktura;
              var vrednost_procenta = vrednost_procenta * 100;

              if(isNaN(vrednost_procenta)) {
                  var vrednost_procenta = 0;
                  }
         

                $('#procenat_izvrsene').circleProgress({
                                                max: 100,
                                                value: vrednost_procenta,
                                                textFormat: 'percent',
                                               });  //POZIVANJE PRIKAZA PROCENTA
                     });


                });
     //UKUPNA VREDNOST FAKTURA SVE GODINE I ODREDJENI KLIJENT - IZVRSENE

     //UKUPNA VREDNOST FAKTURA PO GODINAMA NA CEKANJU
       var verifikacija_prikaz_ukupne_vrednosti_na_cekanju_faktura_za_odredjenu_godinu_i_odredjeni_klijent = "verifikacija_prikaz_ukupne_vrednosti_na_cekanju_faktura_za_odredjenu_godinu_i_odredjeni_klijent";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_prikaz_ukupne_vrednosti_na_cekanju_faktura_za_odredjenu_godinu_i_odredjeni_klijent:verifikacija_prikaz_ukupne_vrednosti_na_cekanju_faktura_za_odredjenu_godinu_i_odredjeni_klijent,
                 vrednost_selecta:vrednost_selecta,
                 vrednost_selecta_ime_klijenta:vrednost_selecta_ime_klijenta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              
              var poreska_osnovica_svih_faktura_na_cekanju_po_godinama = "";
              var ukupan_pdv_faktura_na_cekanju_po_godinama = "";
              var ukupna_vrednost_faktura_na_cekanju_po_godinama = "";
                for(var i=0; i<data.length;i++)
                {
                  poreska_osnovica_svih_faktura_na_cekanju_po_godinama = parseFloat(data[i][0]).toFixed(2);
                  ukupan_pdv_faktura_na_cekanju_po_godinama = parseFloat(data[i][1]).toFixed(2);
                  ukupna_vrednost_faktura_na_cekanju_po_godinama = parseFloat(data[i][2]).toFixed(2);
                }
                 if(poreska_osnovica_svih_faktura_na_cekanju_po_godinama == "NaN")
                 {
                  poreska_osnovica_svih_faktura_na_cekanju_po_godinama = 0;
                 }
                 if(ukupan_pdv_faktura_na_cekanju_po_godinama == "NaN")
                 {
                  ukupan_pdv_faktura_na_cekanju_po_godinama = 0;
                 }
                 if(ukupna_vrednost_faktura_na_cekanju_po_godinama == "NaN")
                 {
                  ukupna_vrednost_faktura_na_cekanju_po_godinama = 0;
                 }
               $("#span_ukupan_pdv_faktura_ne_placenih").html(ukupan_pdv_faktura_na_cekanju_po_godinama);
               $("#span_ukupna_poreska_osnovica_svih_faktura_ne_placenih").html(poreska_osnovica_svih_faktura_na_cekanju_po_godinama);
               $("#span_ukupna_vrednost_faktura_ne_placenih").html(ukupna_vrednost_faktura_na_cekanju_po_godinama);
              
                
                var verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent_i_odredjena_godina = "verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent_i_odredjena_godina";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent_i_odredjena_godina:verifikacija_uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent_i_odredjena_godina,
                 vrednost_selecta:vrednost_selecta,
                 vrednost_selecta_ime_klijenta:vrednost_selecta_ime_klijenta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              broj_redova_faktura_izvrsenih = data[0][0];

              var vrednost_procenta = broj_redova_faktura_izvrsenih / broj_redova_faktura;
              var vrednost_procenta = vrednost_procenta * 100;

             if(isNaN(vrednost_procenta)) {
                  var vrednost_procenta = 0;
                  }
              
                $('#procenat_na_cekanju').circleProgress({
                                                max: 100,
                                                value: vrednost_procenta,
                                                textFormat: 'percent',
                                               });  //POZIVANJE PRIKAZA PROCENTA
                     });

                });
     //UKUPNA VREDNOST FAKTURA PO GODINAMA NA CEKANJU

     //UKUPNA VREDNOST FAKTURA PO GODINAMA SVE ZAJEDNO
       var verifikacija_prikaz_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent = "verifikacija_prikaz_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_prikaz_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent:verifikacija_prikaz_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent,
                 vrednost_selecta:vrednost_selecta,
                 vrednost_selecta_ime_klijenta:vrednost_selecta_ime_klijenta
            },function(data,status){
              var data = jQuery.parseJSON(data);
              
              var poreska_osnovica_svih_faktura_po_godinama = "";
              var ukupan_pdv_faktura_po_godinama = "";
              var ukupna_vrednost_faktura_po_godinama = "";
                for(var i=0; i<data.length;i++)
                {
                  poreska_osnovica_svih_faktura_po_godinama = parseFloat(data[i][0]).toFixed(2);
                  ukupan_pdv_faktura_po_godinama = parseFloat(data[i][1]).toFixed(2);
                  ukupna_vrednost_faktura_po_godinama = parseFloat(data[i][2]).toFixed(2);
                }
                  if(poreska_osnovica_svih_faktura_po_godinama == "NaN")
                 {
                  poreska_osnovica_svih_faktura_po_godinama = 0;
                 }
                 if(ukupan_pdv_faktura_po_godinama == "NaN")
                 {
                  ukupan_pdv_faktura_po_godinama = 0;
                 }
                 if(ukupna_vrednost_faktura_po_godinama == "NaN")
                 {
                  ukupna_vrednost_faktura_po_godinama = 0;
                 }
             
              
               $("#span_ukupan_pdv_svih_faktura").html(ukupan_pdv_faktura_po_godinama);
               $("#span_ukupna_poreska_osnovica_svih_faktura").html(poreska_osnovica_svih_faktura_po_godinama);
               $("#span_ukupna_vrednost_svih_faktura").html(ukupna_vrednost_faktura_po_godinama);
              
               var verifikacija_uzimanje_broja_redova_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent = "verifikacija_uzimanje_broja_redova_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent";
            $.post("src/php/php_pocetna/handler_pocetna.php",{                 
                 verifikacija_uzimanje_broja_redova_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent:verifikacija_uzimanje_broja_redova_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent,
                 vrednost_selecta:vrednost_selecta,
                 vrednost_selecta_ime_klijenta:vrednost_selecta_ime_klijenta
            },function(data,status){


            })
                });
      //UKUPNA VREDNOST FAKTURA PO GODINAMA SVE ZAJEDNO
}
     });
  


  $("#select_odabir_klijenti_ili_sve_ukupno_za_prikaz_vrednosti").change(function(){

    window.prikaz_vrednosti_faktura();
  });
}




window.prikaz_svih_faktura_na_pocetnoj_strani = function()
{
    var verifikacija_prikaz_svih_faktura_na_pocetnoj_strani = "verifikacija_prikaz_svih_faktura_na_pocetnoj_strani";
        $.post("src/php/php_pocetna/handler_pocetna.php",{
          verifikacija_prikaz_svih_faktura_na_pocetnoj_strani:verifikacija_prikaz_svih_faktura_na_pocetnoj_strani,
        },function(data,status){
           var data = jQuery.parseJSON(data);

                var rezultat = "";
                for(var i=0; i<data.length;i++)
                {
                  if(data[i][4] == "placena" && data[i][5] == "RSD")
                  {
   rezultat +='<tr><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>Izvrsena</td><td>RSD</td><td>'+data[i][6]+'</td><td><button class="btn btn-primary" onClick="prikazi_fakturu_na_pocetnoj('+data[i][1]+')">Prikaži fakturu</button></td></tr>';
  
                  }
                  else if(data[i][4] == "placena" && data[i][5] == "EUR")
                  {
   rezultat +='<tr><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>Izvrsena</td><td>EUR</td><td>'+data[i][6]+'</td><td><button class="btn btn-primary" onClick="prikazi_fakturu_na_pocetnoj('+data[i][1]+')">Prikaži fakturu</button></td></tr>';
                  }
                 //UKOLIKO JE FAKTURA POCETA DA SE PRAVI I PREKINUTA
//OVDE MU SE OSTAVLJA MOGUCNOST DA JE OBRISE...TO SU OVE DBE VARIJANTE I DOLAZE PRE OPCIJE NE PLACENA
  else if(data[i][6] == "" && data[i][5] == "RSD")
                  {
                    //sa dugmetom obrisi
   rezultat +='<tr style="background-color: red;"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>Stornirana</td><td>EUR</td><td><b>GREŠKA - NE DOVRŠENA FAKTURA</b></td><td><button disabled class="btn btn-primary" id="prikazi_klijentovu_fakturu_dugme" onClick="prikazi_klijentovu_fakturu('+data[i][1]+')">Prikaži fakturu</button></td></td></tr>';             
                  }
                  else if(data[i][6] == "" && data[i][5] == "EUR")
                  {
                    //sa dugmetom obrisi
   rezultat +='<tr style="background-color: red;"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>Stornirana</td><td>EUR</td><td><b>GREŠKA - NE DOVRŠENA FAKTURA</b></td><td><button disabled class="btn btn-primary" id="prikazi_klijentovu_fakturu_dugme" onClick="prikazi_klijentovu_fakturu('+data[i][1]+')">Prikaži fakturu</button></td></tr>';             
                  }
//UKOLIKO JE FAKTURA POCETA DA SE PRAVI I PREKINUTA
//OVDE MU SE OSTAVLJA MOGUCNOST DA JE OBRISE...TO SU OVE DBE VARIJANTE I DOLAZE PRE OPCIJE NE PLACENA

                  else if(data[i][4] == "ne_placena" && data[i][5] == "RSD")
                  {
   rezultat +='<tr style="background-color: darkgray;"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td style="border: 1px solid red;">Na čekanju</td><td>RSD</td><td>'+data[i][6]+'</td><td><button class="btn btn-primary" onClick="prikazi_fakturu_na_pocetnoj('+data[i][1]+')">Prikaži fakturu</button></td></tr>';
                  }
                  else if(data[i][4] == "ne_placena" && data[i][5] == "EUR")
                  {
   rezultat +='<tr style="background-color: darkgray;"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td style="border: 1px solid red;">Na čekanju</td><td>EUR</td><td>'+data[i][6]+'</td><td><button class="btn btn-primary" onClick="prikazi_fakturu_na_pocetnoj('+data[i][1]+')">Prikaži fakturu</button></td></tr>';             
                  }
                  else if(data[i][4] == "storno" && data[i][5] == "RSD")
                  {
                    //sa dugmetom obrisi
   rezultat +='<tr style="background-color: red;"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>Stornirana</td><td>RSD</td><td>'+data[i][6]+'</td><td><button class="btn btn-primary" onClick="prikazi_fakturu_na_pocetnoj('+data[i][1]+')">Prikaži fakturu</button></td></tr>';             
                  }
                  else if(data[i][4] == "storno" && data[i][5] == "EUR")
                  {
                    //sa dugmetom obrisi
   rezultat +='<tr style="background-color: red;"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>Stornirana</td><td>EUR</td><td>'+data[i][6]+'</td><td><button class="btn btn-primary" onClick="prikazi_fakturu_na_pocetnoj('+data[i][1]+')">Prikaži fakturu</button></td></tr>';             
                  }

              }

              $("#prikaz_svih_faktura_na_pocetnoj tbody").html(rezultat);
                $("#prikaz_svih_faktura_na_pocetnoj").DataTable({      //OVIM DEFINISEMO DODATAK ZA TABELU
                               "language": {
                                   "lengthMenu": "Prikaži _MENU_",
                                   "zeroRecords": "Nema rezultata pretrage",
                                   "info": "Stranica _PAGE_ od ukupno _PAGES_",    //OVIM DEFINISEMO SRPSKI JEZIK U DODATKU
                                   "infoEmpty": "Nema rezultata",
                                   "infoFiltered": "(od ukupno _MAX_ faktura)",    //OVA DVA PREVODA SU MORALA OVDE DA STOJE JER MORAJU BITI TU ODMAH ISPOD UCITAVANJA
                                   "search":         "Pretraži fakture:",
                                   "paginate": {
                                               "first":      "Prva",
                                               "last":       "Poslednja",
                                               "next":       "Sledeca",
                                               "previous":   "Predhodna"
                                             },
                                         "loadingRecords": "Ucitavanje...",
                                         "loadingRecords": "Obrada..."
                                     },
                                      "bSort": false,                                     
                                     "pagingType": "full_numbers",  //POKAZUJE SVE BROJEVE PAGINACIJE
                                     "retrieve": true,
                                     "scrollCollapse": true,
                                 //     "scrollY": "560px",
                                     // "scrollX": false,
                                     "paging":         true,
                                     "searching": true,
                                     "search": {
                                                  "search": ""
                                                },
                                                "autoWidth": false

                                            } );

         });
}


window.prikazi_klijentove_fakture = function(id_klijenta){

 // $('#pregled_svih_faktura_jednog_klijenta').modal('toggle'); //otvaranje modala
  $('#da_znamo_cijeg_klijenta_su_fakture_prilikom_refresha').val(id_klijenta);

  var verifikacija_prikaz_svih_faktura_jednog_klijenta = "verifikacija_prikaz_svih_faktura_jednog_klijenta";
  $.post("src/php/php_pocetna/handler_pocetna.php",{
    verifikacija_prikaz_svih_faktura_jednog_klijenta:verifikacija_prikaz_svih_faktura_jednog_klijenta,
    id_klijenta:id_klijenta
  },function(data,status){

    var data = jQuery.parseJSON(data);

                var rezultat = "";
                for(var i=0; i<data.length;i++)
                {                  
                 if(data[i][4] == "placena" && data[i][5] == "RSD")
                  {
   rezultat +='<tr><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>Izvrsena</td><td>RSD</td><td>'+data[i][6]+'</td><td><button class="btn btn-primary" id="prikazi_klijentovu_fakturu_dugme" onClick="prikazi_klijentovu_fakturu('+data[i][1]+')">Prikaži fakturu</button></td><td></td></tr>';
  
                  }
                  else if(data[i][4] == "placena" && data[i][5] == "EUR")
                  {
   rezultat +='<tr><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>Izvrsena</td><td>EUR</td><td>'+data[i][6]+'</td><td><button class="btn btn-primary" id="prikazi_klijentovu_fakturu_dugme" onClick="prikazi_klijentovu_fakturu('+data[i][1]+')">Prikaži fakturu</button></td><td></td></tr>';
                  }

//UKOLIKO JE FAKTURA POCETA DA SE PRAVI I PREKINUTA
//OVDE MU SE OSTAVLJA MOGUCNOST DA JE OBRISE...TO SU OVE DBE VARIJANTE I DOLAZE PRE OPCIJE NE PLACENA
  else if(data[i][6] == "" && data[i][5] == "RSD")
                  {
                    //sa dugmetom obrisi
   rezultat +='<tr style="background-color: red;"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>Stornirana</td><td>EUR</td><td><b>GREŠKA - NE DOVRŠENA FAKTURA</b></td><td><button disabled class="btn btn-primary" id="prikazi_klijentovu_fakturu_dugme" onClick="prikazi_klijentovu_fakturu('+data[i][1]+')">Prikaži fakturu</button></td><td><button id="dugme_obrisi_fakturu" class="btn btn-dark" onClick="obrisi_fakturu_sa_pocetne('+data[i][1]+')">Obriši fakturu</button></td></tr>';             
                  }
                  else if(data[i][6] == "" && data[i][5] == "EUR")
                  {
                    //sa dugmetom obrisi
   rezultat +='<tr style="background-color: red;"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>Stornirana</td><td>EUR</td><td><b>GREŠKA - NE DOVRŠENA FAKTURA</b></td><td><button disabled class="btn btn-primary" id="prikazi_klijentovu_fakturu_dugme" onClick="prikazi_klijentovu_fakturu('+data[i][1]+')">Prikaži fakturu</button></td><td><button id="dugme_obrisi_fakturu" class="btn btn-dark" onClick="obrisi_fakturu_sa_pocetne('+data[i][1]+')">Obriši fakturu</button></td></tr>';             
                  }
//UKOLIKO JE FAKTURA POCETA DA SE PRAVI I PREKINUTA
//OVDE MU SE OSTAVLJA MOGUCNOST DA JE OBRISE...TO SU OVE DBE VARIJANTE I DOLAZE PRE OPCIJE NE PLACENA

                  else if(data[i][4] == "ne_placena" && data[i][5] == "RSD")
                  {
   rezultat +='<tr style="background-color: darkgray;"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td style="border: 1px solid red;">Na čekanju</td><td>RSD</td><td>'+data[i][6]+'</td><td><button class="btn btn-primary" id="prikazi_klijentovu_fakturu_dugme" onClick="prikazi_klijentovu_fakturu('+data[i][1]+')">Prikaži fakturu</button></td><td></td></tr>';
                  }
                  else if(data[i][4] == "ne_placena" && data[i][5] == "EUR")
                  {
   rezultat +='<tr style="background-color: darkgray;"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td style="border: 1px solid red;">Na čekanju</td><td>EUR</td><td>'+data[i][6]+'</td><td><button class="btn btn-primary" id="prikazi_klijentovu_fakturu_dugme" onClick="prikazi_klijentovu_fakturu('+data[i][1]+')">Prikaži fakturu</button></td><td></td></tr>';             
                  }
                  else if(data[i][4] == "storno" && data[i][5] == "RSD")
                  {
                    //sa dugmetom obrisi
   rezultat +='<tr style="background-color: red;"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>Stornirana</td><td>RSD</td><td>'+data[i][6]+'</td><td><button class="btn btn-primary" id="prikazi_klijentovu_fakturu_dugme" onClick="prikazi_klijentovu_fakturu('+data[i][1]+')">Prikaži fakturu</button></td><td><button id="dugme_obrisi_fakturu" class="btn btn-dark" onClick="obrisi_fakturu_sa_pocetne('+data[i][1]+')">Obriši fakturu</button></td></tr>';             
                  }
                  else if(data[i][4] == "storno" && data[i][5] == "EUR")
                  {
                    //sa dugmetom obrisi
   rezultat +='<tr style="background-color: red;"><td>'+data[i][0]+'.</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>Stornirana</td><td>EUR</td><td>'+data[i][6]+'</td><td><button class="btn btn-primary" id="prikazi_klijentovu_fakturu_dugme" onClick="prikazi_klijentovu_fakturu('+data[i][1]+')">Prikaži fakturu</button></td><td><button id="dugme_obrisi_fakturu" class="btn btn-dark" onClick="obrisi_fakturu_sa_pocetne('+data[i][1]+')">Obriši fakturu</button></td></tr>';             
                  }
                  
    //  ime_klijenta_za_ispis = data[i][2];
              }

     //   $("#prikaz_kog_klijenta_su_fakture").html(ime_klijenta_za_ispis);
         $("#prikaz_svih_faktura_jednog_klijenta tbody").html(rezultat);
                $("#prikaz_svih_faktura_jednog_klijenta").DataTable({      //OVIM DEFINISEMO DODATAK ZA TABELU
                               "language": {
                                   "lengthMenu": "Prikaži _MENU_",
                                   "zeroRecords": "Nema rezultata pretrage ili zeljeni korisnik trenutno nema faktura",
                                   "info": "Stranica _PAGE_ od ukupno _PAGES_",    //OVIM DEFINISEMO SRPSKI JEZIK U DODATKU
                                   "infoEmpty": "Nema rezultata",
                                   "infoFiltered": "(od ukupno _MAX_ faktura)",    //OVA DVA PREVODA SU MORALA OVDE DA STOJE JER MORAJU BITI TU ODMAH ISPOD UCITAVANJA
                                   "search":         "Pretraži fakture:",
                                   "paginate": {
                                               "first":      "Prva",
                                               "last":       "Poslednja",
                                               "next":       "Sledeca",
                                               "previous":   "Predhodna"
                                             },
                                         "loadingRecords": "Ucitavanje...",
                                         "loadingRecords": "Obrada..."
                                     },
                                      "bSort": false,                                     
                                     "pagingType": "full_numbers",  //POKAZUJE SVE BROJEVE PAGINACIJE
                                     "retrieve": true,
                                     "scrollCollapse": true,
                                      "scrollY": "410px",
                                     // "scrollX": false,
                                     "paging":         true,
                                     "searching": true,
                                     "search": {
                                                  "search": ""
                                                },
                                                "autoWidth": false,
                                                "dom": 'Bfrtip',
                                    "buttons": [
                                                'pdf',
                                                
                                               ]

                                            } )
 

    

         var verifikacija_uzimanje_imena_kllijenta_za_naslov_svih_klijentovih_faktura = "verifikacija_uzimanje_imena_kllijenta_za_naslov_svih_klijentovih_faktura";
  $.post("src/php/php_pocetna/handler_pocetna.php",{
    verifikacija_uzimanje_imena_kllijenta_za_naslov_svih_klijentovih_faktura:verifikacija_uzimanje_imena_kllijenta_za_naslov_svih_klijentovih_faktura,
    id_klijenta:id_klijenta
  },function(data,status){

    var data = jQuery.parseJSON(data);

                
        $("#prikaz_kog_klijenta_su_fakture").html(data[0][0]);
              });

  });

}



window.obrisi_fakturu_sa_pocetne = function(id_fakture){

   
 var id_klijenta = $('#da_znamo_cijeg_klijenta_su_fakture_prilikom_refresha').val();

       var verifikacija_obrisi_fakturu_sa_pocetne_strane_ili_iz_modala_pregled_svih_klijentovih_faktura = "verifikacija_obrisi_fakturu_sa_pocetne_strane_ili_iz_modala_pregled_svih_klijentovih_faktura";
                $.post("src/php/php_pocetna/handler_pocetna.php",{
                     id_fakture:id_fakture,
                     verifikacija_obrisi_fakturu_sa_pocetne_strane_ili_iz_modala_pregled_svih_klijentovih_faktura:verifikacija_obrisi_fakturu_sa_pocetne_strane_ili_iz_modala_pregled_svih_klijentovih_faktura,
                },function(data,status){
        
             window.prikazi_klijentove_fakture(id_klijenta);
             $('#prikaz_svih_faktura_na_pocetnoj').DataTable().destroy();
             window.prikaz_svih_faktura_na_pocetnoj_strani();
            })
        
       

       // window.prikazi_klijentove_fakture();
  
}

window.prikazi_fakturu_na_pocetnoj = function(id_fakture){
  id_odabrane_fakture = id_fakture; //ovo nam treba da bi promenili status na osnovu ovog id-a

  $("#glavni_div").css("display","none");
  $("#faktura").css("display","block");
  $('html, body').animate({scrollTop: '0px'}, 0); //automatsko vracanje na vrh

  $('.zatvaranje_fakture').attr('id', 'zatvori_prikaz_fakture_sa_pocetne');

    var verifikacija_prikazi_vrednosti_fakture_i_preuzmi_id_klijenta = "verifikacija_prikazi_vrednosti_fakture_i_preuzmi_id_klijenta";
                $.post("src/php/php_pocetna/handler_pocetna.php",{
                     id_fakture:id_fakture,
                     verifikacija_prikazi_vrednosti_fakture_i_preuzmi_id_klijenta:verifikacija_prikazi_vrednosti_fakture_i_preuzmi_id_klijenta,
                },function(data,status){
                  var data = jQuery.parseJSON(data);
                 informacija_o_stampanju_brojeva_slovima = data[0][10];


                 id_odabranog_klijenta = data[0][0];
                 ukupan_iznos_za_uplatu = data[0][6];
                 if(informacija_o_stampanju_brojeva_slovima == "stampati")
                 {
                  $("#cifra_u_slovima").html(numberToWords(ukupan_iznos_za_uplatu));
                 }
                 // else if(informacija_o_stampanju_brojeva_slovima == "ne_stampati")
                 // {

                 
                 
                 if(data[0][9] == "ne_placena")
                 {
                  ispis_status_fakture = "Na čekanju";
                  $("#select_placeno-nije_placeno").removeAttr('disabled');
                //  $("#predracun_u_racun").removeAttr('disabled');
                //  $("#racun_u_predracun").removeAttr('disabled');
                  $("#dugme_stampaj").removeAttr('disabled');
                 }
                 else if(data[0][9] == "placena")
                 {
                  ispis_status_fakture = "Izvrsena";
                  $("#select_placeno-nije_placeno").attr('disabled', 'disabled');
                //  $("#predracun_u_racun").attr('disabled', 'disabled');
                //  $("#racun_u_predracun").attr('disabled', 'disabled');
                  $("#dugme_stampaj").removeAttr('disabled');
                 }
                 else if(data[0][9] == "storno")
                 {
                  ispis_status_fakture = "Stornirana";
                  $("#select_placeno-nije_placeno").attr('disabled', 'disabled');
                //  $("#predracun_u_racun").attr('disabled', 'disabled');
                //  $("#racun_u_predracun").attr('disabled', 'disabled');
                  $("#dugme_stampaj").attr('disabled', 'disabled');
                 }
                 
                 $("#ispis_statusa_fakture").html(ispis_status_fakture);
                 $("#iznos_fakture").html(data[0][6]);
                 $("#poreska_osnovica_fakture").html(data[0][4]);
                 $("#pdv_fakture").html(data[0][5]);
                 $("#za_uplatu_fakture").html(data[0][6]);
                 $("#nacin_placanja").html(data[0][3]);
                 $("#valuta_fakture").html(data[0][2]);
                 $("#datum_izdavanja_fakture").html(data[0][1]);
                 $("#datum_izdavanja_fakture2").html(data[0][1]);

                 $("#broj_fakture").html(data[0][7]);
                 $("#godina_fakture").html(data[0][8]);

                 //OVDE CEMO PREUZETI SVE PODATKE VEZANE ZA FAKTURU OD PHP-A I DODELITI IH VREDNOSTIMA HTML ELEMENTIMA U FAKTURI
                 //SAMO KAD DODJEMO DOTLE SA PRAVLJENJEM FAKTURE 



                 var verifikacija_preuzimanje_podataka_o_odabranom_klijentu = "verifikacija_preuzimanje_podataka_o_odabranom_klijentu";
                $.post("src/php/php_pocetna/handler_pocetna.php",{
                     id_odabranog_klijenta:id_odabranog_klijenta,
                     verifikacija_preuzimanje_podataka_o_odabranom_klijentu:verifikacija_preuzimanje_podataka_o_odabranom_klijentu,
                },function(data,status){
                  var data = jQuery.parseJSON(data);

                  $("#ime_klijenta_na_fakturi").html(data[0][0]);
                  $("#sediste_firme_klijenta_na_fakturi").html(data[0][1]);
                  $("#pib_klijenta_na_fakturi").html(data[0][2]);
                  $("#maticni_br_klijenta_na_fakturi").html(data[0][3]);   //ISPIS PODATAKA O KLIJENTU U FAKTURI
                  $("#tr_klijenta_na_fakturi").html(data[0][6]);
                  $("#mesto_otpreme_klijenta_na_fakturi").html(data[0][1]);
                });
              //}
            });


    var verifikacija_prikaz_artikala_redova_fakture = "verifikacija_prikaz_artikala_redova_fakture";
                $.post("src/php/php_pocetna/handler_pocetna.php",{
                     id_fakture:id_fakture,
                     verifikacija_prikaz_artikala_redova_fakture:verifikacija_prikaz_artikala_redova_fakture,
                },function(data,status){
                  var data = jQuery.parseJSON(data);
                  

                var rezultat = "";
                for(var i=0; i<data.length;i++)
                {
                  
  rezultat +='<tr><td>'+data[i][0]+'.</td><td>'+data[i][1]+'</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'</td><td>'+data[i][6]+'</td><td>'+data[i][7]+'</td><td>'+data[i][8]+'</td></tr>';
 
                }

                $("#prikaz_svih_artikala_u_fakturi tbody").html(rezultat);
                

                var ukupan_broj_redova = $('table#prikaz_svih_artikala_u_fakturi tr').length;

                for(var i=ukupan_broj_redova; i<16; i++)
                {

  rezultat +='<tr><td>'+i+'.</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
  //ovim   i   dodajemo samo redni broj koji se uvecava sve da 15-og reda u tabeli
                }
                $("#prikaz_svih_artikala_u_fakturi tbody").html(rezultat);
                });
}


window.prikazi_klijentovu_fakturu = function(id_fakture){
  

  id_odabrane_fakture = id_fakture; //ovo nam treba da bi promenili status na osnovu ovog id-a
 // $('#pregled_svih_klijenata').modal('hide');
  $("#glavni_div").css("display","none");
  $("#faktura").css("display","block");
  $("#promeni_status_text").css("visibility","visible");
  $("#select_placeno-nije_placeno").css("visibility","visible");
  $('html, body').animate({scrollTop: '0px'}, 0); //automatsko vracanje na vrh
  
  $('.zatvaranje_fakture').attr('id', 'zatvori_prikaz_fakture_odredjenog_klijenta');
  $('#pregled_svih_faktura_jednog_klijenta').modal('hide');
  $("html").css("overflow-y","auto");

    var verifikacija_prikazi_vrednosti_fakture_i_preuzmi_id_klijenta = "verifikacija_prikazi_vrednosti_fakture_i_preuzmi_id_klijenta";
                $.post("src/php/php_pocetna/handler_pocetna.php",{
                     id_fakture:id_fakture,
                     verifikacija_prikazi_vrednosti_fakture_i_preuzmi_id_klijenta:verifikacija_prikazi_vrednosti_fakture_i_preuzmi_id_klijenta,
                },function(data,status){
                  var data = jQuery.parseJSON(data);
                 
                 informacija_o_stampanju_brojeva_slovima = data[0][10];
                 id_odabranog_klijenta = data[0][0];
                 ukupan_iznos_za_uplatu = data[0][6];

                 if(informacija_o_stampanju_brojeva_slovima == "stampati")
                 {
                  $("#cifra_u_slovima").html(numberToWords(ukupan_iznos_za_uplatu));
                 }
                 // else if(informacija_o_stampanju_brojeva_slovima == "ne_stampati")
                 // {
                 
                 if(data[0][9] == "ne_placena")
                 {
                  ispis_status_fakture = "Na čekanju";
                  $("#select_placeno-nije_placeno").removeAttr('disabled');
               //   $("#predracun_u_racun").removeAttr('disabled');
                //  $("#racun_u_predracun").removeAttr('disabled');
                  $("#dugme_stampaj").removeAttr('disabled');
                 }
                 else if(data[0][9] == "placena")
                 {
                  ispis_status_fakture = "Izvrsena";
                  $("#select_placeno-nije_placeno").attr('disabled', 'disabled');
               //   $("#predracun_u_racun").attr('disabled', 'disabled');
                //  $("#racun_u_predracun").attr('disabled', 'disabled');
                  $("#dugme_stampaj").removeAttr('disabled');
                 }
                 else if(data[0][9] == "storno")
                 {
                  ispis_status_fakture = "Stornirana";
                  $("#select_placeno-nije_placeno").attr('disabled', 'disabled');
                //  $("#predracun_u_racun").attr('disabled', 'disabled');
                //  $("#racun_u_predracun").attr('disabled', 'disabled');
                  $("#dugme_stampaj").attr('disabled', 'disabled');
                 }

                 
                 $("#ispis_statusa_fakture").html(ispis_status_fakture);
                 $("#iznos_fakture").html(data[0][6]);
                 $("#poreska_osnovica_fakture").html(data[0][4]);
                 $("#pdv_fakture").html(data[0][5]);
                 $("#za_uplatu_fakture").html(data[0][6]);
                 $("#nacin_placanja").html(data[0][3]);
                 $("#valuta_fakture").html(data[0][2]);
                 $("#datum_izdavanja_fakture").html(data[0][1]);
                 $("#datum_izdavanja_fakture2").html(data[0][1]);

                 $("#broj_fakture").html(data[0][7]);
                 $("#godina_fakture").html(data[0][8]);

                 //OVDE CEMO PREUZETI SVE PODATKE VEZANE ZA FAKTURU OD PHP-A I DODELITI IH VREDNOSTIMA HTML ELEMENTIMA U FAKTURI
                 //SAMO KAD DODJEMO DOTLE SA PRAVLJENJEM FAKTURE 



                 var verifikacija_preuzimanje_podataka_o_odabranom_klijentu = "verifikacija_preuzimanje_podataka_o_odabranom_klijentu";
                $.post("src/php/php_pocetna/handler_pocetna.php",{
                     id_odabranog_klijenta:id_odabranog_klijenta,
                     verifikacija_preuzimanje_podataka_o_odabranom_klijentu:verifikacija_preuzimanje_podataka_o_odabranom_klijentu,
                },function(data,status){
                  var data = jQuery.parseJSON(data);

                  $("#ime_klijenta_na_fakturi").html(data[0][0]);
                  $("#sediste_firme_klijenta_na_fakturi").html(data[0][1]);
                  $("#pib_klijenta_na_fakturi").html(data[0][2]);
                  $("#maticni_br_klijenta_na_fakturi").html(data[0][3]);   //ISPIS PODATAKA O KLIJENTU U FAKTURI
                  $("#tr_klijenta_na_fakturi").html(data[0][6]);
                  $("#mesto_otpreme_klijenta_na_fakturi").html(data[0][1]);
                });
             // }
            });


    var verifikacija_prikaz_artikala_redova_fakture = "verifikacija_prikaz_artikala_redova_fakture";
                $.post("src/php/php_pocetna/handler_pocetna.php",{
                     id_fakture:id_fakture,
                     verifikacija_prikaz_artikala_redova_fakture:verifikacija_prikaz_artikala_redova_fakture,
                },function(data,status){
                  var data = jQuery.parseJSON(data);
                  

                var rezultat = "";
                for(var i=0; i<data.length;i++)
                {
                  
  rezultat +='<tr><td>'+data[i][0]+'.</td><td>'+data[i][1]+'</td><td>'+data[i][2]+'</td><td>'+data[i][3]+'</td><td>'+data[i][4]+'</td><td>'+data[i][5]+'</td><td>'+data[i][6]+'</td><td>'+data[i][7]+'</td><td>'+data[i][8]+'</td></tr>';
 
                }

                $("#prikaz_svih_artikala_u_fakturi tbody").html(rezultat);
                
                

                var ukupan_broj_redova = $('table#prikaz_svih_artikala_u_fakturi tr').length;

                for(var i=ukupan_broj_redova; i<16; i++)
                {

  rezultat +='<tr><td>'+i+'.</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
  //ovim   i   dodajemo samo redni broj koji se uvecava sve da 15-og reda u tabeli
                }
                $("#prikaz_svih_artikala_u_fakturi tbody").html(rezultat);

                });
}

function prikazi_kao_predracun()
{
    
   $("#faktura_ili_predracun").css("display","none");
   $("#prikaz_da_je_predracun").css("display","block");

   $("#racun_u_predracun").css("display","none").css("float","right");
   $("#predracun_u_racun").css("display","block").css("float","right");
 
}

function prikazi_kao_faktura()
 {
      $("#faktura_ili_predracun").css("display","block");
      $("#prikaz_da_je_predracun").css("display","none");

      $("#predracun_u_racun").css("display","none").css("float","right");
      $("#racun_u_predracun").css("display","block").css("float","right");

 }


  function stampaj() 
{

 $("#div_fiksiran_na_vrh_za_menjanje_statusa_fakture").css("display","none");
 $("#faktura").print();
 $("#div_fiksiran_na_vrh_za_menjanje_statusa_fakture").css("display","block");
}
  





function numberToWords(number) {  
        var digit = ['nula', 'jedan', 'dva', 'tri', 'četiri', 'pet', 'šest', 'sedam', 'osam', 'devet'];  
        var elevenSeries = ['deset', 'jedanaest', 'dvanaest', 'trinaest', 'četrnaest', 'petnaest', 'šesnaest', 'sedamnaest', 'osamnaest', 'devetnaest'];  
        var countingByTens = ['dvadeset', 'trideset', 'četrdeset', 'pedeset', 'šezdeset', 'sedamdeset', 'osamdeset', 'devedeset'];  
        var shortScale = ['', 'hiljada', 'milion', 'milijardu', 'trillion'];  
  
        number = number.toString();
        number = number.replace(/[\, ]/g, '');
        if (number != parseFloat(number)) return 'Nije broj';
        var x = number.indexOf('.'); if (x == -1) x = number.length;
        if (x > 15) return 'Preveliki broj'; var n = number.split('');
        var str = '';
        var sk = 0; for (var i = 0; i < x; i++) 
        { 
          if ((x - i) % 3 == 2) {
                if (n[i] == '1') { str += elevenSeries[Number(n[i + 1])] + ''; i++; sk = 1; }
                else if (n[i] != 0) { str += countingByTens[n[i] - 2] + ''; sk = 1; } } 
        
         else if (n[i] != 0) { str += digit[n[i]] + ''; if ((x - i) % 3 == 0) str += 'sto'; sk = 1; }

         if ((x - i) % 3 == 1) 
           { 
             if (sk) str += shortScale[(x - i - 1) / 3] + ''; sk = 0;
           } 
       } 
       
        if (x != number.length) { var y = number.length; str += '';
        // for (var i = x + 1; i < y; i++) str += digit[n[i]] + '';   //OVO DODAJE DVE NULE NA KRAJU
        }  
        str = str.replace(/\number+/g, ''); return str.trim() + "";  
  
    }





window.izmena_statusa_fakture = function()
{

 $("#select_placeno-nije_placeno").change(function(){
  var id_klijenta = $('#da_znamo_cijeg_klijenta_su_fakture_prilikom_refresha').val();



     var vrednost_selecta = $("#select_placeno-nije_placeno").val();
     if(vrednost_selecta == "placena"){
      if(confirm("Ovu funkciju nije moguce opozvati") == true)
     {
       var verifikacija_promena_statusa_fakture = "verifikacija_promena_statusa_fakture";
        $.post("src/php/php_pocetna/handler_pocetna.php",{
             vrednost_selecta:vrednost_selecta,
             id_odabrane_fakture:id_odabrane_fakture,
             verifikacija_promena_statusa_fakture:verifikacija_promena_statusa_fakture,
        },function(data,status){
          var data = jQuery.parseJSON(data);

          if(data == "ne_placena")
         {
          $("#select_placeno-nije_placeno").removeAttr('disabled');
          $("#ispis_statusa_fakture").html("Na čekanju");
          $("#select_placeno-nije_placeno option:selected").prop("selected", false);
          $("#select_placeno-nije_placeno option:first").prop("selected", "selected");
          $('#prikaz_svih_faktura_jednog_klijenta').DataTable().destroy();
          window.prikazi_klijentove_fakture(id_klijenta);
  //        $('#prikaz_svih_faktura_na_pocetnoj').DataTable().destroy();
    //      window.prikaz_svih_faktura_na_pocetnoj_strani();
          window.prikaz_ukupne_vrednosti_faktura_za_opciju_sve_ukupno();
         }
         else if(data == "placena")
         {
          $("#select_placeno-nije_placeno").attr('disabled', 'disabled');
          $("#ispis_statusa_fakture").html("Izvrsena");
          $("#select_placeno-nije_placeno option:selected").prop("selected", false);
          $("#select_placeno-nije_placeno option:first").prop("selected", "selected");
          $('#prikaz_svih_faktura_jednog_klijenta').DataTable().destroy();
          window.prikazi_klijentove_fakture(id_klijenta);
      //    $('#prikaz_svih_faktura_na_pocetnoj').DataTable().destroy();
    //      window.prikaz_svih_faktura_na_pocetnoj_strani();
          window.prikaz_ukupne_vrednosti_faktura_za_opciju_sve_ukupno();
         }
         else if(data == "storno")
         {
          $("#select_placeno-nije_placeno").attr('disabled', 'disabled');
          $("#ispis_statusa_fakture").html("Storno");
          $("#select_placeno-nije_placeno option:selected").prop("selected", false);
          $("#select_placeno-nije_placeno option:first").prop("selected", "selected");
          $('#prikaz_svih_faktura_jednog_klijenta').DataTable().destroy();
          window.prikazi_klijentove_fakture(id_klijenta);
   //       $('#prikaz_svih_faktura_na_pocetnoj').DataTable().destroy();
   //       window.prikaz_svih_faktura_na_pocetnoj_strani();
          window.prikaz_ukupne_vrednosti_faktura_za_opciju_sve_ukupno();
         }
         

        });

     }
     $("#select_placeno-nije_placeno option:selected").prop("selected", false);
          $("#select_placeno-nije_placeno option:first").prop("selected", "selected");
     }




    else if(vrednost_selecta == "storno"){
      if(confirm("Ovu funkciju nije moguce opozvati") == true)
     {
       var verifikacija_promena_statusa_fakture = "verifikacija_promena_statusa_fakture";
        $.post("src/php/php_pocetna/handler_pocetna.php",{
             vrednost_selecta:vrednost_selecta,
             id_odabrane_fakture:id_odabrane_fakture,
             verifikacija_promena_statusa_fakture:verifikacija_promena_statusa_fakture,
        },function(data,status){
          var data = jQuery.parseJSON(data);

          if(data == "ne_placena")
         {
          $("#select_placeno-nije_placeno").removeAttr('disabled');
          $("#ispis_statusa_fakture").html("Na čekanju");
          $("#select_placeno-nije_placeno option:selected").prop("selected", false);
          $("#select_placeno-nije_placeno option:first").prop("selected", "selected");
          $('#prikaz_svih_faktura_jednog_klijenta').DataTable().destroy();
          window.prikazi_klijentove_fakture(id_klijenta);
     //     $('#prikaz_svih_faktura_na_pocetnoj').DataTable().destroy();
     //     window.prikaz_svih_faktura_na_pocetnoj_strani();
          window.prikaz_ukupne_vrednosti_faktura_za_opciju_sve_ukupno();
         }
         else if(data == "placena")
         {
          $("#select_placeno-nije_placeno").attr('disabled', 'disabled');
          $("#ispis_statusa_fakture").html("Izvrsena");
          $("#select_placeno-nije_placeno option:selected").prop("selected", false);
          $("#select_placeno-nije_placeno option:first").prop("selected", "selected");
          $('#prikaz_svih_faktura_jednog_klijenta').DataTable().destroy();
          window.prikazi_klijentove_fakture(id_klijenta);
      //    $('#prikaz_svih_faktura_na_pocetnoj').DataTable().destroy();
      //    window.prikaz_svih_faktura_na_pocetnoj_strani();
          window.prikaz_ukupne_vrednosti_faktura_za_opciju_sve_ukupno();
         }
         else if(data == "storno")
         {
          $("#select_placeno-nije_placeno").attr('disabled', 'disabled');
          $("#ispis_statusa_fakture").html("Storno");
          $("#select_placeno-nije_placeno option:selected").prop("selected", false);
          $("#select_placeno-nije_placeno option:first").prop("selected", "selected");
          $('#prikaz_svih_faktura_jednog_klijenta').DataTable().destroy();
          window.prikazi_klijentove_fakture(id_klijenta);
        //  $('#prikaz_svih_faktura_na_pocetnoj').DataTable().destroy();
       //   window.prikaz_svih_faktura_na_pocetnoj_strani();
          window.prikaz_ukupne_vrednosti_faktura_za_opciju_sve_ukupno();
         }
         

        });
        $("#dugme_stampaj").attr('disabled', 'disabled');
     }
     $("#select_placeno-nije_placeno option:selected").prop("selected", false);
          $("#select_placeno-nije_placeno option:first").prop("selected", "selected");
     }    
     
 });

}


window.menjanje_divova_za_prikaz = function()
{
//OBRISI FAKTURU
$(document).on('click',"#dugme_obrisi_fakturu",function(){
   
   $('#prikaz_svih_faktura_jednog_klijenta').dataTable().fnClearTable();
   $('#prikaz_svih_faktura_jednog_klijenta').dataTable().fnDestroy();
   //posle svakog zatvaranja modala prikaz klijentovih faktura
   //unistavamo datatble da ne bi doslo do pogresno ispisanog rezultata pretrage
   //je ostane zapamcen poslednja pretraga i onda samo njegove fakture trazi

 });
//OBRISI FAKTURU

//MODAL PREGLED SVIH KLIJENATA
$(document).on('click',"#pregled_svih_klijenata_dugme",function(){
   $("#glavni_div").css("display", "none");
   $("#pregled_svih_klijenata").css("display", "block");
});
$(document).on('click',"#zatvaranje_modala_svi_klijenti_gore, #zatvaranje_modala_svi_klijenti_dole",function(){
   $("#glavni_div").css("display", "block");
   $("#pregled_svih_klijenata").css("display", "none");
   $('#prikaz_kklijenata_u_tabeli').dataTable().fnClearTable();
   $('#prikaz_kklijenata_u_tabeli').dataTable().fnDestroy();
   $('#prikaz_svih_faktura_na_pocetnoj').DataTable().destroy();
   window.prikaz_svih_faktura_na_pocetnoj_strani();
});
//MODAL PREGLED SVIH KLIJENATA

// MODAL MAGACIN
$(document).on('click',"#pregled_magacina_modal_dugme",function(){
$("#glavni_div").css("display", "none");
   $("#pregled_magacina_modal").css("display", "block");
});

$(document).on('click',"#dugme_zatvaranje_modal_gornje, #dugme_zatvaranje_modal_donje",function(){
$("#glavni_div").css("display", "block");
   $("#pregled_magacina_modal").css("display", "none");
   $('#prikaz_magacina_u_tabeli').dataTable().fnClearTable();
   $('#prikaz_magacina_u_tabeli').dataTable().fnDestroy();
});
// MODAL MAGACIN



// MODAL SVE KLIJENTOVE FAKTURE
$(document).on('click',"#prikazi_klijentove_fakture_dugme",function(){
$("#pregled_svih_klijenata").css("display", "none");
   $("#pregled_svih_faktura_jednog_klijenta").css("display", "block");
});
$(document).on('click',"#zatvaranje_modala_sve_fakture_jednog_klijenta_gornje, #zatvaranje_modala_sve_fakture_jednog_klijenta_donje",function(){
$("#pregled_svih_klijenata").css("display", "block");
   $("#pregled_svih_faktura_jednog_klijenta").css("display", "none");
   $('#prikaz_svih_faktura_jednog_klijenta').dataTable().fnClearTable();
   $('#prikaz_svih_faktura_jednog_klijenta').dataTable().fnDestroy();
   $('#prikaz_kklijenata_u_tabeli').dataTable().fnClearTable();
   $('#prikaz_kklijenata_u_tabeli').dataTable().fnDestroy();
   window.pregled_svih_klijenta();
  
});
// MODAL SVE KLIJENTOVE FAKTURE

//ZATVORI PRIKAZ FAKTURE ODREDJENOG KLIJENTA
$(document).on('click',"#prikazi_klijentovu_fakturu_dugme",function(){
$("#pregled_svih_faktura_jednog_klijenta").css("display", "none");
   $("#faktura").css("display", "block");
});
$(document).on('click',"#prikazi_klijentove_fakture_dugme",function(){
$("#pregled_svih_klijenata").css("display", "none");
   $("#pregled_svih_faktura_jednog_klijenta").css("display", "block");
});
//ZATVORI PRIKAZ FAKTURE ODREDJENOG KLIJENTA


//ZATVORI PRIKAZ FAKTURE SA POCETNE STRANE AKTIVIRANO
$(document).on('click',"#zatvori_prikaz_fakture_sa_pocetne",function(){
   
  $("#cifra_u_slovima").html("");
  $("#glavni_div").css("display","block");
  $("#faktura").css("display","none");
  $('html, body').animate({scrollTop: '0px'}, 0); //automatsko vracanje na vrh
});
//ZATVORI PRIKAZ FAKTURE SA POCETNE STRANE AKTIVIRANO

//ZATVORI PRIKAZ FAKTURE ODREDJENOG KLIJENTA
$(document).on('click',"#zatvori_prikaz_fakture_odredjenog_klijenta",function(){
  var id_klijenta = $('#da_znamo_cijeg_klijenta_su_fakture_prilikom_refresha').val();
  $("#cifra_u_slovima").html("");
  $("#pregled_svih_faktura_jednog_klijenta").css("display","block");
  $("#faktura").css("display","none");
  $('html, body').animate({scrollTop: '0px'}, 0); //automatsko vracanje na vrh
  $('#prikaz_svih_faktura_jednog_klijenta').DataTable().destroy();
  window.prikazi_klijentove_fakture(id_klijenta);
});
//ZATVORI PRIKAZ FAKTURE ODREDJENOG KLIJENTA
}