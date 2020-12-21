$(document).ready(function(){ 
	window.prikaz_podataka_o_korisniku_na_pocetnoj();
  window.cuvanje_osnovnih_podataka_o_fakturi();
  window.odabir_proizvoda_iz_dataliste_za_unos_u_fakturu();
  window.sacuvaj_red_unosa_u_fakturu();
  window.obrisi_fakturu_u_izradi();
  window.sacuvaj_fakturu();

})


window.prikaz_podataka_o_korisniku_na_pocetnoj = function() //prikaz_podataka_o_korisniku_na_pocetnoj
 {                                                           //i punjenje selecta imenima klijenata
	   $('#modal_odabir_klijenta_za_fakturu').modal('show'); //PRVO POZIVAMO MODAL
     $("#select_klijenti").chosen({no_results_text: "Oops, nema pronadjenih rezultata!"}); //odmah cim UCITAMO DOCUMENT oblikujemo select uz pomoc CHOSEN dodatka

 var verifikacija_prikaz_imena_klijenata_za_select = "verifikacija_prikaz_imena_klijenata_za_select";
      $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
         verifikacija_prikaz_imena_klijenata_za_select:verifikacija_prikaz_imena_klijenata_za_select,
      },function(data,status){
        var rezultat = "";
         var data = jQuery.parseJSON(data);

         for(var i=0; i<data.length;i++){

              rezultat+="<option>"+data[i][0]+"</option>";
         }

         $("#select_klijenti").append(rezultat).trigger("chosen:updated"); //ZATIM UPDATUJEMO,ISPISUJEMO PODATKE U NOVI CHOSEN OBLIKOVANI SELECT (imena klijenata)
                                                                 //ovim ispisujemo podatke u chosen select
      });

                  $("#select_klijenti").change(function(){   //zatim reagujemo na promenu u selectu
                    $('#modal_odabir_klijenta_za_fakturu').modal('hide');  //prvo zatvaramo modal

                       var ime_klijenta = $("#select_klijenti").val();
                      var verifikacija_select_popuna_podataka_klijenta = "verifikacija_select_popuna_podataka_klijenta";
                     $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{     //za izabrano ime uzimamo podatke
                           ime_klijenta:ime_klijenta,
                           verifikacija_select_popuna_podataka_klijenta:verifikacija_select_popuna_podataka_klijenta,
                     },function(data,status){
                       var data = jQuery.parseJSON(data);

                       $("#ime_klijenta_na_izradi_fakture").val(data[0][1]).attr('disabled','disabled');;   //ako je izabrano neko ime automacki popunjava inpute sa njegovim ostalim podacima i danasnjim datumom
                       $("#pib_klijenta_na_izradi_fakture").val(data[0][3]).attr('disabled','disabled');;
                       $("#maticni_br_klijenta_na_izradi_fakture").val(data[0][4]).attr('disabled','disabled');;
                       $("#email_klijenta_na_izradi_fakture").val(data[0][5]).attr('disabled','disabled');;
                       $("#adresa_klijenta_na_izradi_fakture").val(data[0][2]).attr('disabled','disabled');;
                       $("#telefon_klijenta_na_izradi_fakture").val(data[0][6]).attr('disabled','disabled');;
                       $("#ziro_racun_klijenta_na_izradi_fakture").val(data[0][7]).attr('disabled','disabled');;
                       $("#cuvanje_id_klijenta").val(data[0][0]); //skrivenom inputu dodeljujemo id klijenta
                       

                       Date.prototype.toDateInputValue = (function() {
                                      var local = new Date(this);
                                      local.setMinutes(this.getMinutes() - this.getTimezoneOffset()); //OVO DEFINISE DANASNJI DATUM
                                      return local.toJSON().slice(0,10);
                                        });
                       $("#datum_fakture_na_izradi_fakture").val(new Date().toDateInputValue()); //OVIM DANASNJI DATUM ISPISUJEMO U INPUT DATUM

                });
           });
      }
//PRIKAZ IMENA KLIJENATA U SELECTU I AUTOMACKA POPUNA PODATAKA

window.punjenje_selekta_sa_imenima_proizvoda = function()
{
  $("#polje_za_unos_podataka_artikli").chosen({no_results_text: "Oops, nema pronadjenih rezultata!"}); //odmah cim UCITAMO DOCUMENT oblikujemo select uz pomoc CHOSEN dodatka

  var verifikacija_punjenje_selekta_sa_imenima_proizvoda = "verifikacija_punjenje_selekta_sa_imenima_proizvoda";
      $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
         verifikacija_punjenje_selekta_sa_imenima_proizvoda:verifikacija_punjenje_selekta_sa_imenima_proizvoda,
      },function(data,status){
         var rezultat = "";
         var data = jQuery.parseJSON(data);

         for(var i=0; i<data.length;i++){

              rezultat+="<option>"+data[i][0]+"</option>";
         }

         $("#polje_za_unos_podataka_artikli").append(rezultat).trigger("chosen:updated"); 
      });
}
  
window.cuvanje_osnovnih_podataka_o_fakturi = function()
{
    $("#dugme_sacuvaj_klijenta_na_izradi_fakture").click(function(){

        var id_klijenta = $("#cuvanje_id_klijenta").val();

        //ovim uzimamo datum u formatu YYYY-MM-DD
        var datum_izrade_fakture = $("#datum_fakture_na_izradi_fakture").val();
        var datum_izrade_fakture = datum_izrade_fakture.split("-");
        var datum_izrade_fakture = datum_izrade_fakture[2] + ' - ' + datum_izrade_fakture[1] + ' - ' + datum_izrade_fakture[0];
        //i pretvaramo ga u DD-MM-YYYY

        var izabrana_valuta = $("#valuta_fakture_na_izradi_fakture").val();
        var nacin_placanja = $("#nacin_placanja_fakture_na_izradi_fakture").val();
        var ime_klijenta = $("#ime_klijenta_na_izradi_fakture").val();
        var informacija_o_stampanju_brojeva_slovima = $("#da_li_odstampati_brojeve_slovima").val();





            //NA OSNOVU OVOGA PRVO PROVERAVAMO DA LI JE OVO PRVA FAKTURA DO SADA     
    var verifikacija_prikaz_rednog_broja_i_godine_pravljenja_fakture = "verifikacija_prikaz_rednog_broja_i_godine_pravljenja_fakture";
            $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
              verifikacija_prikaz_rednog_broja_i_godine_pravljenja_fakture:verifikacija_prikaz_rednog_broja_i_godine_pravljenja_fakture,
       
              },function(data,status){
                var data = jQuery.parseJSON(data);  
            

                var postoji_ili_ne_postoji_klijent_u_tabeli_faktura = data;
              //NA OSNOVU OVOGA PRVO PROVERAVAMO DA LI JE OVO PRVA FAKTURA DO SADA  


              //UNOSENJE BROJA I GODINE U FAKTURU
                  var verifikacija_unos_godine_i_rednog_broja = "verifikacija_unos_godine_i_rednog_broja";
                  var datum = new Date();   //danasnji datum kompletan
                  var danasnja_godina = datum.getFullYear();   //sadasnja godina
                              //OVIM DEFINISEMO DA JE FAKTURA ODMAH U STARTU NE PLACENA TJ DA JE TAKO PRIKAZUJE
             if(data == '')  //ako ne postoji u bazi tj prva je faktura
             {   
              redni_broj_fakture = 1;  //onda unosimo vrednost fakture jedan
                    
                             var verifikacija_cuvanje_osnovnih_podataka_o_fakturi = "verifikacija_cuvanje_osnovnih_podataka_o_fakturi";
                       $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{     //za izabrano ime uzimamo podatke                
                             verifikacija_cuvanje_osnovnih_podataka_o_fakturi:verifikacija_cuvanje_osnovnih_podataka_o_fakturi,
                             id_klijenta:id_klijenta,
                             datum_izrade_fakture:datum_izrade_fakture,
                             izabrana_valuta:izabrana_valuta,
                             nacin_placanja:nacin_placanja,
                             redni_broj_fakture:redni_broj_fakture,
                             danasnja_godina:danasnja_godina,
                             ime_klijenta:ime_klijenta,
                             informacija_o_stampanju_brojeva_slovima:informacija_o_stampanju_brojeva_slovima
                       },function(data,status){
                         var data = jQuery.parseJSON(data);

                         id_fakture = data;
                         
                         $("#red_za_punjenje_fakture").css("display","block");
                         $("#dugme_sacuvaj_klijenta_na_izradi_fakture").attr("disabled","disabled");
                         $("#da_li_odstampati_brojeve_slovima").attr("disabled","disabled");
                         $("#datum_fakture_na_izradi_fakture").attr("disabled","disabled");
                         $("#valuta_fakture_na_izradi_fakture").attr("disabled","disabled");
                         $("#nacin_placanja_fakture_na_izradi_fakture").attr("disabled","disabled");
                         window.punjenje_selekta_sa_imenima_proizvoda(); 
                                       //odavde pozivamo funkciju za punjenje chosena sa proizvodima
                          $("#obrisi_fakturu_u_izradi").val(id_fakture);
                          $("#sacuvaj_fakturu").val(id_klijenta);
                       //   $("#iks_zatvori_pravljenje_fakture").val(id_fakture);
                          $("#obrisi_fakturu_u_izradi").css("display","block");

                    });
                 }

             else if(postoji_ili_ne_postoji_klijent_u_tabeli_faktura != '') //ako nije prva faktura onda samo dodajmo brojeve 
             {
                  var verifikacija_prikaz_rednog_broja_i_godine_pravljenja_fakture = "verifikacija_prikaz_rednog_broja_i_godine_pravljenja_fakture";
                     $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
                          verifikacija_prikaz_rednog_broja_i_godine_pravljenja_fakture:verifikacija_prikaz_rednog_broja_i_godine_pravljenja_fakture,

                    },function(data,status){
                      var data = jQuery.parseJSON(data); 
                   
                   var redni_broj_fakture = data[0][0];
                   var trenutna_godina_iz_baze = data[0][1];
                  
 
                   if(trenutna_godina_iz_baze == danasnja_godina)                          //sve dok se godine podudaraju on povecava vrednost
                 { 

                     redni_broj_fakture = parseInt(redni_broj_fakture) + 1;


                        var verifikacija_cuvanje_osnovnih_podataka_o_fakturi = "verifikacija_cuvanje_osnovnih_podataka_o_fakturi";
                       $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{     //za izabrano ime uzimamo podatke                
                             verifikacija_cuvanje_osnovnih_podataka_o_fakturi:verifikacija_cuvanje_osnovnih_podataka_o_fakturi,
                             id_klijenta:id_klijenta,
                             datum_izrade_fakture:datum_izrade_fakture,
                             izabrana_valuta:izabrana_valuta,
                             nacin_placanja:nacin_placanja,
                             redni_broj_fakture:redni_broj_fakture,
                             danasnja_godina:danasnja_godina,
                             ime_klijenta:ime_klijenta,
                             informacija_o_stampanju_brojeva_slovima:informacija_o_stampanju_brojeva_slovima
                       },function(data,status){
                         var data = jQuery.parseJSON(data);

                         id_fakture = data;
                         
                         $("#red_za_punjenje_fakture").css("display","block");
                         $("#dugme_sacuvaj_klijenta_na_izradi_fakture").attr("disabled","disabled");
                         $("#da_li_odstampati_brojeve_slovima").attr("disabled","disabled");
                         $("#datum_fakture_na_izradi_fakture").attr("disabled","disabled");
                         $("#valuta_fakture_na_izradi_fakture").attr("disabled","disabled");
                         $("#nacin_placanja_fakture_na_izradi_fakture").attr("disabled","disabled");
                         window.punjenje_selekta_sa_imenima_proizvoda(); 
                                       //odavde pozivamo funkciju za punjenje chosena sa proizvodima
                          $("#obrisi_fakturu_u_izradi").val(id_fakture);
                          $("#sacuvaj_fakturu").val(id_klijenta);
                      //    $("#iks_zatvori_pravljenje_fakture").val(id_fakture);
                          $("#obrisi_fakturu_u_izradi").css("display","block");

                           });
                 }

                 else if(trenutna_godina_iz_baze !== danasnja_godina)   //e kad se godina promeni onda samo jednom aktivira ovaj else if
                 {  
                        redni_broj_fakture = 1;    //i opet dodeljuje vrednost jedan
                             //zatim koristi samo srednji else if  za povecavanje po jedan
                                  //prvi if koristi samo pri pravljenju prve fakture a treci
                                    //samo kad prebacuje godinu tj prvi put u godini
                          

                        var verifikacija_cuvanje_osnovnih_podataka_o_fakturi = "verifikacija_cuvanje_osnovnih_podataka_o_fakturi";
                       $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{     //za izabrano ime uzimamo podatke                
                             verifikacija_cuvanje_osnovnih_podataka_o_fakturi:verifikacija_cuvanje_osnovnih_podataka_o_fakturi,
                             id_klijenta:id_klijenta,
                             datum_izrade_fakture:datum_izrade_fakture,
                             izabrana_valuta:izabrana_valuta,
                             nacin_placanja:nacin_placanja,
                             redni_broj_fakture:redni_broj_fakture,
                             danasnja_godina:danasnja_godina,
                             ime_klijenta:ime_klijenta,
                             informacija_o_stampanju_brojeva_slovima:informacija_o_stampanju_brojeva_slovima
                       },function(data,status){
                         var data = jQuery.parseJSON(data);

                         id_fakture = data;
                         
                         $("#red_za_punjenje_fakture").css("display","block");
                         $("#dugme_sacuvaj_klijenta_na_izradi_fakture").attr("disabled","disabled");
                         $("#da_li_odstampati_brojeve_slovima").attr("disabled","disabled");
                         $("#datum_fakture_na_izradi_fakture").attr("disabled","disabled");
                         $("#valuta_fakture_na_izradi_fakture").attr("disabled","disabled");
                         $("#nacin_placanja_fakture_na_izradi_fakture").attr("disabled","disabled");
                         window.punjenje_selekta_sa_imenima_proizvoda(); 
                                       //odavde pozivamo funkciju za punjenje chosena sa proizvodima
                          $("#obrisi_fakturu_u_izradi").val(id_fakture);
                          $("#sacuvaj_fakturu").val(id_klijenta);
                   //       $("#iks_zatvori_pravljenje_fakture").val(id_fakture);
                          $("#obrisi_fakturu_u_izradi").css("visibility","visible");

                           });
                          }
                       });
                     }
                  });
               });
              }

window.odabir_proizvoda_iz_dataliste_za_unos_u_fakturu = function()
{  //za izabrano ime proizvoda uzimamo podatke o ceni

   $("#polje_za_unos_podataka_artikli").change(function(){
    izabrani_proizvod = $("#polje_za_unos_podataka_artikli").val();
   //alert(izabrani_proizvod);

   var verifikacija_odabir_proizvoda_iz_dataliste_za_unos_u_fakturu = "verifikacija_odabir_proizvoda_iz_dataliste_za_unos_u_fakturu";
     $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{               
           verifikacija_odabir_proizvoda_iz_dataliste_za_unos_u_fakturu:verifikacija_odabir_proizvoda_iz_dataliste_za_unos_u_fakturu,
           izabrani_proizvod:izabrani_proizvod,
           
     },function(data,status){
       var data = jQuery.parseJSON(data);
       var polje_za_unos_podataka_cena_sa_pdv = parseFloat(data[0][0]).toFixed(2);

       $("#polje_za_unos_podataka_cena_sa_pdv").val(polje_za_unos_podataka_cena_sa_pdv);
       $("#trenutno_stanje_magacina_odredjenog_proizvoda").val(data[0][1]+' m³');
     })
   })
}

window.sacuvaj_red_unosa_u_fakturu = function()
{
  $('table#moja_tabela').on('click','tr:last input[name=plus]',function(){ 

    var ukupan_broj_redova = $('table#moja_tabela_za_ispis_redova tr').length;
 
//POD JEDAN PRVO PROVERAVAMO DA BROJ REDOVA NIJE VECI OD 15
    if(ukupan_broj_redova >= 16)
    {
      alert('Ukupan broj redova po fakturi ne može biti veći od 15');
      return;
    }
    var naziv_proizvoda = $('table#moja_tabela tr:last select[name=polje_za_unos_podataka_artikli]').val();
    var kolicina = $('table#moja_tabela tr:last input[name=kolicina]').val();

    var verifikacija_provera_da_li_izabranog_proizvoda_ima_dovoljno_na_stanju = "verifikacija_provera_da_li_izabranog_proizvoda_ima_dovoljno_na_stanju";
            $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
                 verifikacija_provera_da_li_izabranog_proizvoda_ima_dovoljno_na_stanju:verifikacija_provera_da_li_izabranog_proizvoda_ima_dovoljno_na_stanju,
                 naziv_proizvoda:naziv_proizvoda
            },function(data,status){
              var data = jQuery.parseJSON(data);

             trenutno_stanje_magacina_za_ovaj_proizvod = data[0][0];
//POD DVA PROVERAVAMO DA KUBIKAZA KOJU ZELIMO DA UNESEMO NIJE VECA OD ONE U MAGACINU           
            if(trenutno_stanje_magacina_za_ovaj_proizvod - kolicina  < 0 )
              {
                alert('Trenutno nemate dovoljnu količinu ovog proizvoda na stanju');
                $('table#moja_tabela tr:last input[name=kolicina]').val('');
                return;
              }
          id_odabranog_proizvoda =  data[0][1]; 

    
//POD TRI SRACUNAVAMO VREDNOST TOG JEDNOG REDA ZA UNOS U TABELI ARTIKLI FAKTURE 
    
    var jedinica_mere = "m³";
    
    var cena_po_jedinici = "";  //reseno
    var rabat = "";
    var poreska_osnovica = "";  //reseno
    var pdv = 20;
    var iznos_pdv = "";         //reseno
    var ukupna_vrednost = "";  //reseno 
    var cena_sa_pdv = $('table#moja_tabela tr:last input[name=cena_sa_pdv]').val(); //cena za jedan kubik
    
    
    var cena_po_jedinici = cena_sa_pdv/120 * 100;
    var cena_po_jedinici = parseFloat(cena_po_jedinici).toFixed(3).slice(0, -1); 
    
    var ukupna_vrednost = kolicina * cena_sa_pdv;
    var ukupna_vrednost = parseFloat(ukupna_vrednost).toFixed(3).slice(0, -1);  //Math.round() mozda u sredinu ali onda zaokruzuje na 00;

    var poreska_osnovica = ukupna_vrednost/120 * 100;
    var poreska_osnovica = parseFloat(poreska_osnovica).toFixed(3).slice(0, -1);


    var iznos_pdv = ukupna_vrednost - poreska_osnovica;
    var iznos_pdv = parseFloat(iznos_pdv).toFixed(3).slice(0, -1);
    //SVE POTREBNE INFORMACIJE ZA UNOS U BAZU NA OSNOVU UNOSA PODATAKA CENE ZA KUBIK I KOLICINE

    


//POD CETIRI PROVERAVAMO DA LI JE NESTO U SELEKTU OBELEZENO I DA LI JE UNETA KOLICINA
    if(naziv_proizvoda == null  || kolicina == "")
    {
      alert('Odaberite jedan od proizvoda ili unesite kolicinu');
      return;
    }
    else
    {
//POD PET - PRVA OPCIJA AKO JE PRVI RED ONDA UNOSIMO JEDAN RED FAKTURE U BAZU  
      $('table#moja_tabela_za_ispis_redova tr:first').css("visibility","visible");  
      $("#obrisi_fakturu_u_izradi").css("display","none");  
      $("#sacuvaj_fakturu").css("visibility","visible");
      $("#moja_tabela_za_ispis_redova").css("visibility","visible"); //prikazujemo red unosa podataka u fakturu

      var total = $("table#moja_tabela_za_ispis_redova").find("tr").length;    //prebrojava redove koliko ih ima
      
       if(total == 1) //ovo znaci da je prazna tabela tj da je tu samo jedan red NASLOV
       {
        
         var verifikacija_unos_vrednosti_jednog_reda_fakture_u_bazu = "verifikacija_unos_vrednosti_jednog_reda_fakture_u_bazu";
           $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{     //za izabrano ime uzimamo podatke                
                 verifikacija_unos_vrednosti_jednog_reda_fakture_u_bazu:verifikacija_unos_vrednosti_jednog_reda_fakture_u_bazu,
                 id_fakture:id_fakture,
                 naziv_proizvoda:naziv_proizvoda,
                 jedinica_mere:jedinica_mere,
                 kolicina:kolicina,
                 cena_po_jedinici:cena_po_jedinici,
                 poreska_osnovica:poreska_osnovica,
                 pdv:pdv,
                 iznos_pdv:iznos_pdv,
                 ukupna_vrednost:ukupna_vrednost
           },function(data,status){
             var data = jQuery.parseJSON(data);

               id_reda_u_fakturi = data;

//POD SEST ISPISUJEMO VREDNOSTI I U TABELU RADI VIZUALA                                                                                                                                                                                                          // OVAKO MOZEMO DA POSALJEMO DVA PARAMETRA UZ POMOC ON CLICK FUNKCIJE                                                                                                  
               //svakom redu dodaljujemo id na osnovu kog ga kasnije po potrebi brisemo
               var novi_red_dodavanje_u_fakturu = '<tr id='+id_reda_u_fakturi+'><td>'+naziv_proizvoda+'</td><td>'+jedinica_mere+'</td><td>'+kolicina+'</td><td>'+cena_sa_pdv+'</td><td>'+ukupna_vrednost+'</td><td><button name="izbrisi" class="btn btn-danger" onClick="izbrisi_odredjeni_red_iz_fakture(\''+id_reda_u_fakturi+','+id_odabranog_proizvoda+','+kolicina+'\')">Izbriši red</button></td></tr>';
          $('#moja_tabela_za_ispis_redova tbody').append(novi_red_dodavanje_u_fakturu);  //nalepi novi red
   
           });
       

        $('table#moja_tabela tr:last input[name=kolicina]').val('');
        $('table#moja_tabela tr:last select[name=polje_za_unos_podataka_artikli]').trigger("chosen:updated");

 
//POD SEDAM SRACUNAVAMO UKUPNU VREDNOST FAKTURE  
       //ponovni odlazak u bazu po ukupnu cifru, trenutnu kroz funkciju koju odmah pozivamo
        //a takodje je pozivamo i kada brisemo red
  window.ispis_trenuto_ukupne_cifre_na_fakturie = function()
  {
        var verifikacija_ispis_trenuto_ukupne_cifre_na_fakturie = "verifikacija_ispis_trenuto_ukupne_cifre_na_fakturie";
            $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
                 verifikacija_ispis_trenuto_ukupne_cifre_na_fakturie:verifikacija_ispis_trenuto_ukupne_cifre_na_fakturie,
                 id_fakture:id_fakture
            },function(data,status){
              var data = jQuery.parseJSON(data);
              var data = parseFloat(data).toFixed(2);
             $("#ispis_trenuto_ukupne_cifre_na_fakturi").html(data);
             
            })
     }
     window.ispis_trenuto_ukupne_cifre_na_fakturie();  //odmah je napravimo i odmah pozivamo


//I POD OSAM PRVO VADIMO INFORMACIJE O PROIZVODU SRACUNAVAMO NOVE VREDNOSTI I TE NOVE VREDNOSTI 
//UNOSIMO U BAZU
  
//OVDE PRAVIMO FUNKCIJU ZA UMANJENJE STANJA MAGACINA
//PRVO FUNKCIJA KOJA CE DA UZME PODATKE O ARTIKLU SIRINA,VISINA,DUZINA ITD...
//PA TO SVE SABRATI NOVE VREDNOSTI MAGACINA NA OSNOVU CENE I KOLICINE I SVIH TIH ARTIKLA 
//PA IH ONDA UNETI U TABELU PROIZVODI
// I OVU ISTU FUNKCIJU PONOVITI DOLE ISPOD KAD JE BROJ REDOVA VECI OD JEDAN A POSLE TOGA BRISANJE SA FOR 
//PETLJOM
         
         var verifikacija_uzimanje_informacija_o_proizvodu_zbog_umanjenja_stanja = "verifikacija_uzimanje_informacija_o_proizvodu_zbog_umanjenja_stanja";
            $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
                 verifikacija_uzimanje_informacija_o_proizvodu_zbog_umanjenja_stanja:verifikacija_uzimanje_informacija_o_proizvodu_zbog_umanjenja_stanja,
                 naziv_proizvoda:naziv_proizvoda,
                 
            },function(data,status){
              var data = jQuery.parseJSON(data);

              var sirina = data[0][0];
              var visina = data[0][1];
              var duzina = data[0][2];              //INFORMACIJE IZ BAZE NA OSNOVU KOJIH RACUNAMO NOVO STANJE
              var cena_po_kubiku = data[0][3];
              var ukupna_kubikaza = data[0][4];
              
              kubikaza = ukupna_kubikaza - kolicina;
              kubikaza =  kubikaza.toFixed(2);
              $("#trenutno_stanje_magacina_odredjenog_proizvoda").val(kubikaza+' m³');

              var visina = visina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
              var sirina = sirina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
                                         //duzina je vec u metrima
               var broj_komada = kubikaza / sirina / visina / duzina;
               var broj_komada =  broj_komada.toFixed(2);
               var visina = visina * 100; 
               var visina =  visina.toFixed(0);  
               var sirina = sirina * 100;
               var sirina =  sirina.toFixed(0);

      
               var ukupna_vrednost_u_dinarima  = cena_po_kubiku * kubikaza;
               var ukupna_vrednost_u_dinarima =  ukupna_vrednost_u_dinarima.toFixed(2);

               var cena_po_komadu = ukupna_vrednost_u_dinarima / broj_komada;
               var cena_po_komadu =  cena_po_komadu.toFixed(2);


               //OVDE IZNAD SMO IZRACUNALI NOVO STANJE KUBIKAZE I OSTALIH PARAMETARA 'PROIZVODA'
              //A OVDE DOLE TO STANJE SAD UNOSIMO U BAZU...I TO RADIMO ZA SVAKI RED POSEBNO OVO ISTO CEMO URADITI IZ OPCIJU
              //KADA JE VISE REDOVA U BAZI
           var verifikacija_funkcija_za_umanjivanje_stanja_magacina_fakturom = "verifikacija_funkcija_za_umanjivanje_stanja_magacina_fakturom";
            $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
                 verifikacija_funkcija_za_umanjivanje_stanja_magacina_fakturom:verifikacija_funkcija_za_umanjivanje_stanja_magacina_fakturom,
                 naziv_proizvoda:naziv_proizvoda,
                 kubikaza:kubikaza,
                 broj_komada:broj_komada,
                 ukupna_vrednost_u_dinarima:ukupna_vrednost_u_dinarima,
                 cena_po_komadu:cena_po_komadu
            },function(data,status){
              var data = jQuery.parseJSON(data);
             
            });
            });

       }
       else if(total > 1)
       {
//POD DEVET ILI NASTAVAK PETE OPCIJE AKO NIJE PRVI RED U FAKTURI SVE ISTO SRACUNAVAMO I UNOSIMO     
             var verifikacija_unos_vrednosti_jednog_reda_fakture_u_bazu = "verifikacija_unos_vrednosti_jednog_reda_fakture_u_bazu";
           $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{     //za izabrano ime uzimamo podatke                
                 verifikacija_unos_vrednosti_jednog_reda_fakture_u_bazu:verifikacija_unos_vrednosti_jednog_reda_fakture_u_bazu,
                 id_fakture:id_fakture,
                 naziv_proizvoda:naziv_proizvoda,
                 jedinica_mere:jedinica_mere,
                 kolicina:kolicina,
                 cena_po_jedinici:cena_po_jedinici,
                 poreska_osnovica:poreska_osnovica,
                 pdv:pdv,
                 iznos_pdv:iznos_pdv,
                 ukupna_vrednost:ukupna_vrednost
           },function(data,status){
             var data = jQuery.parseJSON(data);

               id_reda_u_fakturi = data;                                                                                                                                                                                                                         // OVAKO MOZEMO DA POSALJEMO DVA PARAMETRA UZ POMOC ON CLICK FUNKCIJE                                                                        
               //svakom redu dodaljujemo id na osnovu kog ga kasnije po potrebi brisemo
               var novi_red_dodavanje_u_fakturu = '<tr id='+id_reda_u_fakturi+'><td>'+naziv_proizvoda+'</td><td>'+jedinica_mere+'</td><td>'+kolicina+'</td><td>'+cena_sa_pdv+'</td><td>'+ukupna_vrednost+'</td><td><button name="izbrisi" class="btn btn-danger" onClick="izbrisi_odredjeni_red_iz_fakture(\''+id_reda_u_fakturi+','+id_odabranog_proizvoda+','+kolicina+'\')">Izbriši red</button></td></tr>';
          $('#moja_tabela_za_ispis_redova tbody').append(novi_red_dodavanje_u_fakturu);  //nalepi novi red

           });

        $('table#moja_tabela tr:last input[name=kolicina]').val('');
        $('table#moja_tabela tr:last select[name=polje_za_unos_podataka_artikli]').trigger("chosen:updated");

        //ponovni odlazak u bazu po ukupnu cifru, trenutnu kroz funkciju koju odmah pozivamo
        //a takodje je pozivamo i kada brisemo red
  window.ispis_trenuto_ukupne_cifre_na_fakturie = function()
  {
      var verifikacija_ispis_trenuto_ukupne_cifre_na_fakturie = "verifikacija_ispis_trenuto_ukupne_cifre_na_fakturie";
            $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
                 verifikacija_ispis_trenuto_ukupne_cifre_na_fakturie:verifikacija_ispis_trenuto_ukupne_cifre_na_fakturie,
                 id_fakture:id_fakture
            },function(data,status){
              var data = jQuery.parseJSON(data);
              var data = parseFloat(data).toFixed(2);
             $("#ispis_trenuto_ukupne_cifre_na_fakturi").html(data);
            
            })
  }
  window.ispis_trenuto_ukupne_cifre_na_fakturie();  //odmah je napravimo i odmah pozivamo

     //OVDE PRAVIMO FUNKCIJU ZA UMANJENJE STANJA MAGACINA  
     var verifikacija_uzimanje_informacija_o_proizvodu_zbog_umanjenja_stanja = "verifikacija_uzimanje_informacija_o_proizvodu_zbog_umanjenja_stanja";
            $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
                 verifikacija_uzimanje_informacija_o_proizvodu_zbog_umanjenja_stanja:verifikacija_uzimanje_informacija_o_proizvodu_zbog_umanjenja_stanja,
                 naziv_proizvoda:naziv_proizvoda,
                 
            },function(data,status){
              var data = jQuery.parseJSON(data);

              var sirina = data[0][0];
              var visina = data[0][1];
              var duzina = data[0][2];              //INFORMACIJE IZ BAZE NA OSNOVU KOJIH RACUNAMO NOVO STANJE
              var cena_po_kubiku = data[0][3];
              var ukupna_kubikaza = data[0][4];
              
               kubikaza = ukupna_kubikaza - kolicina;
               kubikaza =  kubikaza.toFixed(2);
               $("#trenutno_stanje_magacina_odredjenog_proizvoda").val(kubikaza+' m³');


              var visina = visina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
              var sirina = sirina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
                                         //duzina je vec u metrima
               var broj_komada = kubikaza / sirina / visina / duzina;
               var broj_komada =  broj_komada.toFixed(2);
               var visina = visina * 100; 
               var visina =  visina.toFixed(0);  
               var sirina = sirina * 100;
               var sirina =  sirina.toFixed(0);

      
               var ukupna_vrednost_u_dinarima  = cena_po_kubiku * kubikaza;
               var ukupna_vrednost_u_dinarima =  ukupna_vrednost_u_dinarima.toFixed(2);

               var cena_po_komadu = ukupna_vrednost_u_dinarima / broj_komada;
               var cena_po_komadu =  cena_po_komadu.toFixed(2);


               //OVDE IZNAD SMO IZRACUNALI NOVO STANJE KUBIKAZE I OSTALIH PARAMETARA 'PROIZVODA'
              //A OVDE DOLE TO STANJE SAD UNOSIMO U BAZU...I TO RADIMO ZA SVAKI RED POSEBNO OVO ISTO CEMO URADITI IZ OPCIJU
              //KADA JE VISE REDOVA U BAZI
           var verifikacija_funkcija_za_umanjivanje_stanja_magacina_fakturom = "verifikacija_funkcija_za_umanjivanje_stanja_magacina_fakturom";
            $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
                 verifikacija_funkcija_za_umanjivanje_stanja_magacina_fakturom:verifikacija_funkcija_za_umanjivanje_stanja_magacina_fakturom,
                 naziv_proizvoda:naziv_proizvoda,
                 kubikaza:kubikaza,
                 broj_komada:broj_komada,
                 ukupna_vrednost_u_dinarima:ukupna_vrednost_u_dinarima,
                 cena_po_komadu:cena_po_komadu
            },function(data,status){
              var data = jQuery.parseJSON(data);
             
            });
            });
          }
       }
    });
  })
}


window.izbrisi_odredjeni_red_iz_fakture = function(id_reda_u_fakturi,id_odabranog_proizvoda)
{
 
    if($('table#moja_tabela_za_ispis_redova tr').length == 2)
    {
     $('table#moja_tabela_za_ispis_redova tr:first').css("visibility","hidden"); 
     $('#obrisi_fakturu_u_izradi').css("display","block"); 
   }


          //u onclick smo ubacili id reda fakture i id proizvoda i kolicinu i sve vezano za taj red i taj proizvod
           proba = id_reda_u_fakturi.split(",");
           id_reda_u_fakturi = proba[0];          
           id_odabranog_proizvoda = proba[1];
           kolicina_za_koju_zelimo_zaduziti_magacin = proba[2];   //uzimamo vrednosti onklika



               var verifikacija_izbrisi_odredjeni_red_iz_fakture = "verifikacija_izbrisi_odredjeni_red_iz_fakture";
            $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
                 id_reda_u_fakturi:id_reda_u_fakturi,
                 verifikacija_izbrisi_odredjeni_red_iz_fakture:verifikacija_izbrisi_odredjeni_red_iz_fakture,
            },function(data,status){ 
                                           //PRVO BRISEMO U ARTIKLI FAKTURE RED TJ U BAZI 

                $('#'+id_reda_u_fakturi).remove();       //ZATIM VIZUALNO UKLANJAMO RED SA EKRANA
                window.ispis_trenuto_ukupne_cifre_na_fakturie();   //ZATIM OSVEZAVAMO TRENUTNU VREDNOST FAKTURE
               //id ovog reda je dinamicki stvoren i svakom redu <tr> je dodeljen id sa vrednoscu njegovog 
               //id-a, u bazi takodje je dodeljen, i dugmetu obrisi iz koga uzimamo taj id i posle brisanja iz baze
               //i ovde na osnovu tog id-a uklanjamo i taj red;
  
 
//OVDE PRAVIMO FUNKCIJU ZA UVECANJE STANJA MAGACINA PRILIKOM BRISANJA JEDNOG PO JEDNOG REDA IZ FAKTURE 
     var verifikacija_uzimanje_informacija_o_proizvodu_zbog_uvecanja_stanja = "verifikacija_uzimanje_informacija_o_proizvodu_zbog_uvecanja_stanja";
            $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
                 verifikacija_uzimanje_informacija_o_proizvodu_zbog_uvecanja_stanja:verifikacija_uzimanje_informacija_o_proizvodu_zbog_uvecanja_stanja,
                 id_odabranog_proizvoda:id_odabranog_proizvoda,
                 
            },function(data,status){
              var data = jQuery.parseJSON(data);       //ZATIM UZIMAMO VREDNOSTI PROIZVODA 

              var sirina = data[0][0];
              var visina = data[0][1];
              var duzina = data[0][2];              //INFORMACIJE IZ BAZE NA OSNOVU KOJIH RACUNAMO NOVO STANJE
              var cena_po_kubiku = data[0][3];
              var ukupna_kubikaza = data[0][4];
              
               kubikaza = parseFloat(ukupna_kubikaza) + parseFloat(kolicina_za_koju_zelimo_zaduziti_magacin);   //OVIM UVECAVAMO STANJE
               kubikaza =  kubikaza.toFixed(2);
               $("#trenutno_stanje_magacina_odredjenog_proizvoda").val(kubikaza+' m³');  //visak iz prethodne funkcije


              var visina = visina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
              var sirina = sirina / 100;   //pretvaramo centimetre u metre zbog racunanja kolicine
                                         //duzina je vec u metrima
               var broj_komada = kubikaza / sirina / visina / duzina;
               var broj_komada =  broj_komada.toFixed(2);
               var visina = visina * 100; 
               var visina =  visina.toFixed(0);                     //SRACUNAVAMO SVE  OSTALO
               var sirina = sirina * 100;
               var sirina =  sirina.toFixed(0);

      
               var ukupna_vrednost_u_dinarima  = cena_po_kubiku * kubikaza;
               var ukupna_vrednost_u_dinarima =  ukupna_vrednost_u_dinarima.toFixed(2);

               var cena_po_komadu = ukupna_vrednost_u_dinarima / broj_komada;
               var cena_po_komadu =  cena_po_komadu.toFixed(2);


               //OVDE IZNAD SMO IZRACUNALI NOVO STANJE KUBIKAZE I OSTALIH PARAMETARA 'PROIZVODA'
              //A OVDE DOLE TO STANJE SAD UNOSIMO U BAZU...I TO RADIMO ZA SVAKI RED POSEBNO OVO ISTO CEMO URADITI IZ OPCIJU
              //KADA JE VISE REDOVA U BAZI
           var verifikacija_funkcija_za_uvecanje_stanja_magacina_brisanjem_jednog_reda = "verifikacija_funkcija_za_uvecanje_stanja_magacina_brisanjem_jednog_reda";
            $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{
                 verifikacija_funkcija_za_uvecanje_stanja_magacina_brisanjem_jednog_reda:verifikacija_funkcija_za_uvecanje_stanja_magacina_brisanjem_jednog_reda,
                 id_odabranog_proizvoda:id_odabranog_proizvoda,
                 kubikaza:kubikaza,
                 broj_komada:broj_komada,
                 ukupna_vrednost_u_dinarima:ukupna_vrednost_u_dinarima,       //I NA KRAJU UNOSIMO NOVE VREDNOSTI U BAZU
                 cena_po_komadu:cena_po_komadu
            },function(data,status){
              var data = jQuery.parseJSON(data);
             
            });
         });
      })

            

}
    
//      $('table#moja_tabela_za_ispis_redova tr').each(function(index, tr) {   //sa each funkcijom prolazimo kroz u ovom slucaju sve redove
//                                                                          //i sa find funkcijom nalazimo u tim redovima button-e i na 
//          $(tr).find('button').click();                                   //njih klikcemo sto znaci da automacki brisemo red po red iz
//         }); 




window.obrisi_fakturu_u_izradi = function()
{
  $("#obrisi_fakturu_u_izradi").click(function(){

    if(confirm("Da li ste sigurni?") == true){

       var id_fakture = $("#obrisi_fakturu_u_izradi").val();

       var verifikacija_obrisi_fakturu_u_izradi = "verifikacija_obrisi_fakturu_u_izradi";
                $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{          //zatim brisemo i fakturu
                     id_fakture:id_fakture,
                     verifikacija_obrisi_fakturu_u_izradi:verifikacija_obrisi_fakturu_u_izradi,
                },function(data,status){
               
               window.location.href = 'http://localhost/iva/';
            //   location.reload();
            })
      }
   
  });
}


window.sacuvaj_fakturu = function()
{
  $("#sacuvaj_fakturu").click(function(){ 

       var id_fakture = $("#obrisi_fakturu_u_izradi").val();
       var verifikacija_izracunaj_ukupnu_vrednost_za_fakturu = "verifikacija_izracunaj_ukupnu_vrednost_za_fakturu";
                $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{                    
                     verifikacija_izracunaj_ukupnu_vrednost_za_fakturu:verifikacija_izracunaj_ukupnu_vrednost_za_fakturu,
                     id_fakture:id_fakture,
                },function(data,status){
                 
                 var data = jQuery.parseJSON(data);
                 var ukupna_poreska_osnovica_za_ovu_fakturu = data[0][0];
                 var ukupna_poreska_osnovica_za_ovu_fakturu = parseFloat(ukupna_poreska_osnovica_za_ovu_fakturu).toFixed(2);

                 var ukupan_iznos_pdv_za_ovu_fakturu = data[0][1];
                 var ukupan_iznos_pdv_za_ovu_fakturu = parseFloat(ukupan_iznos_pdv_za_ovu_fakturu).toFixed(2);

                 var ukupna_vrednost_za_ovu_fakturu = data[0][2];
                 var ukupna_vrednost_za_ovu_fakturu = parseFloat(ukupna_vrednost_za_ovu_fakturu).toFixed(2);



                 
                var verifikacija_sacuvaj_u_bazu_podatke_o_ukupnoj_vrednosti_za_fakturu = "verifikacija_sacuvaj_u_bazu_podatke_o_ukupnoj_vrednosti_za_fakturu";
                 $.post("../src/php/php_izrada_fakture/handler_izrada_fakture.php",{                    
                     verifikacija_sacuvaj_u_bazu_podatke_o_ukupnoj_vrednosti_za_fakturu:verifikacija_sacuvaj_u_bazu_podatke_o_ukupnoj_vrednosti_za_fakturu,
                     id_fakture:id_fakture,
                     ukupna_poreska_osnovica_za_ovu_fakturu:ukupna_poreska_osnovica_za_ovu_fakturu,
                     ukupan_iznos_pdv_za_ovu_fakturu:ukupan_iznos_pdv_za_ovu_fakturu,
                     ukupna_vrednost_za_ovu_fakturu:ukupna_vrednost_za_ovu_fakturu
                },function(data,status){
                                  
                      })
            })

       alert('Uspešno sačuvana faktura');
       window.location.href = 'http://localhost/iva/';
   });
}




