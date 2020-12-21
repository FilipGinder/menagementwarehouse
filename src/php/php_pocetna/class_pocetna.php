<?php 
class class_pocetna
{

function prikaz_podataka_o_korisniku_na_pocetnoj()
{
    include ('../konekcija.php');
    $upit = "SELECT ime_firme,sediste_firme,mesto_otpreme,pib_firme,maticni_br_firme,ziro_racun,opis_firme,broj_telefona,fix_br_telefona,email,slika FROM korisnici WHERE id_korisnika = '1'";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($ime_firme,$sediste_firme,$mesto_otpreme,$pib_firme,$maticni_br_firme,$ziro_racun,$opis_firme,$broj_telefona,$fix_br_telefona,$email,$slika);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($ime_firme,$sediste_firme,$mesto_otpreme,$pib_firme,$maticni_br_firme,$ziro_racun,$opis_firme,$broj_telefona,$fix_br_telefona,$email,$slika);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function prikaz_godina_u_selectu()
{
     include ('../konekcija.php');
     $upit = "SELECT DISTINCT trenutna_godina FROM fakture ORDER BY id_fakture DESC";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($trenutna_godina);


     $rezultat_niz = array();

           while ($rezultat->fetch())
           {
            $rezultat_niz[]=array($trenutna_godina);
           }
           $konekcija->close();
       exit(json_encode($rezultat_niz));
}

function prikaz_imena_klijenata_u_selectu()
{
     include ('../konekcija.php');
     $upit = "SELECT DISTINCT ime_klijenta FROM fakture ORDER BY id_fakture DESC";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($ime_klijenta);


     $rezultat_niz = array();

           while ($rezultat->fetch())
           {
            $rezultat_niz[]=array($ime_klijenta);
           }
           $konekcija->close();
       exit(json_encode($rezultat_niz));
}

function prikaz_svih_faktura_na_pocetnoj_strani()
{
  //ORDER BY id_fakture DESC   // sa ovim okrecemo rezultate naopako tj da poslednje uneseni bude prvi
    include ('../konekcija.php');
    $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_klijenta,datum_pravljenja_fakture,status_fakture,valuta_fakture,ukupna_vrednost_fakture FROM fakture, (SELECT @a:= 0) AS a ORDER BY id_fakture DESC LIMIT 100 ";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($broj,$id_fakture,$ime_klijenta,$datum_pravljenja_fakture,$status_fakture,$valuta_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array(); 

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj,$id_fakture,$ime_klijenta,$datum_pravljenja_fakture,$status_fakture,$valuta_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}



function izmena_podataka_o_korisniku_na_pocetnoj()
{
    include ('../konekcija.php');
    $ime_firme = $_POST['ime_firme'];
    $sediste_firme = $_POST['sediste_firme'];
    $mesto_otpreme = $_POST['mesto_otpreme'];
    $pib_firme = $_POST['pib_firme'];
    $maticni_br_firme = $_POST['maticni_br_firme'];
    $ziro_racun = $_POST['ziro_racun'];
    $opis_firme = $_POST['opis_firme'];
    $broj_telefona = $_POST['broj_telefona'];
    $fix_br_telefona = $_POST['fix_br_telefona'];
    $email = $_POST['email'];

    $upit = "UPDATE korisnici SET ime_firme = '$ime_firme', sediste_firme = '$sediste_firme', mesto_otpreme = '$mesto_otpreme',pib_firme = '$pib_firme', maticni_br_firme ='$maticni_br_firme', ziro_racun = '$ziro_racun', opis_firme = '$opis_firme', broj_telefona = '$broj_telefona', fix_br_telefona = '$fix_br_telefona', email = '$email' WHERE id_korisnika = '1'";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();
    $konekcija->close();
    exit(json_encode('uspesno izmenjeni podaci'));
}

function provera_da_li_klijent_postoji_u_bazi()
{
  include ('../konekcija.php');
  $ime_klijenta = $_POST['ime_klijenta'];
  $upit = "SELECT DISTINCT ime_klijenta FROM klijenti WHERE ime_klijenta LIKE '$ime_klijenta'";
  $rezultat = $konekcija->prepare($upit);
  $rezultat->execute();

  $rezultat->bind_result($ime_klijenta_iz_baze);

  $rezultat_niz = array();

        while ($rezultat->fetch())
        {
         $rezultat_niz[]=array($ime_klijenta_iz_baze);
       };
      $konekcija->close();
      exit(json_encode($rezultat_niz));
}
function dodavanje_novog_klijenta()
{
    include ('../konekcija.php');
    $ime_klijenta = $_POST['ime_klijenta'];
    $adresa_klijenta = $_POST['adresa_klijenta'];
    $pib_firme = $_POST['pib_firme'];
    $maticni_br_klijenta = $_POST['maticni_br_klijenta'];
    $email_klijenta = $_POST['email_klijenta'];
    $broj_telefona_klijenta = $_POST['broj_telefona_klijenta'];
    $ziro_racun_klijenta = $_POST['ziro_racun_klijenta'];

     $upit="INSERT INTO klijenti(id_korisnika,ime_klijenta,adresa_klijenta,pib_klijenta,maticni_br_klijenta,email_klijenta,telefon_klijenta,ziro_racun_klijenta) VALUES('1','$ime_klijenta','$adresa_klijenta','$pib_firme','$maticni_br_klijenta','$email_klijenta','$broj_telefona_klijenta','$ziro_racun_klijenta')";
     $rezultat = $konekcija->prepare($upit);
     $rezultat->execute();
     $konekcija->close();
     exit(json_encode('uspesno dodat novi klijent'));
}



function pregled_svih_klijenata()
{
    include ('../konekcija.php');
    $upit = "SELECT @a:=@a+1 broj,id_klijenta,ime_klijenta,adresa_klijenta,pib_klijenta,maticni_br_klijenta,email_klijenta,telefon_klijenta,ziro_racun_klijenta FROM klijenti, (SELECT @a:= 0) AS a WHERE id_korisnika = '1' ORDER BY id_klijenta DESC"; 
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($broj,$id_klijenta,$ime_klijenta,$adresa_klijenta,$pib_klijenta,$maticni_br_klijenta,$email_klijenta,$telefon_klijenta,$ziro_racun_klijenta);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj,$id_klijenta,$ime_klijenta,$adresa_klijenta,$pib_klijenta,$maticni_br_klijenta,$email_klijenta,$telefon_klijenta,$ziro_racun_klijenta);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function prikazi_odredjenog_klijenta_pre_uredjivanja()
{

    include ('../konekcija.php');
    $id_klijenta = $_POST['id_klijenta'];
    $upit = "SELECT id_klijenta,ime_klijenta,adresa_klijenta,pib_klijenta,maticni_br_klijenta,email_klijenta,telefon_klijenta,ziro_racun_klijenta FROM klijenti WHERE id_klijenta = '$id_klijenta'";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($id_klijenta,$ime_klijenta,$adresa_klijenta,$pib_klijenta,$maticni_br_klijenta,$email_klijenta,$telefon_klijenta,$ziro_racun_klijenta);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($id_klijenta,$ime_klijenta,$adresa_klijenta,$pib_klijenta,$maticni_br_klijenta,$email_klijenta,$telefon_klijenta,$ziro_racun_klijenta);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function izmena_podataka_klijenta()
{
    include ('../konekcija.php');
    $id_klijenta = $_POST['id_klijenta'];
    $ime_firme_klijenta = $_POST['ime_firme_klijenta'];
    $adresa_firme_klijenta = $_POST['adresa_firme_klijenta'];
    $pib_firme_klijenta = $_POST['pib_firme_klijenta'];
    $maticni_br_firme_klijenta = $_POST['maticni_br_firme_klijenta'];
    $email_klijenta = $_POST['email_klijenta'];
    $br_telefona_klijenta = $_POST['br_telefona_klijenta'];
    $ziro_racun_klijenta = $_POST['ziro_racun_klijenta'];

    $upit = "UPDATE klijenti SET ime_klijenta = '$ime_firme_klijenta', adresa_klijenta = '$adresa_firme_klijenta', pib_klijenta = '$pib_firme_klijenta',maticni_br_klijenta = '$maticni_br_firme_klijenta', email_klijenta ='$email_klijenta', telefon_klijenta = '$br_telefona_klijenta', ziro_racun_klijenta = '$ziro_racun_klijenta' WHERE id_klijenta = '$id_klijenta'";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();
    $konekcija->close();
    exit(json_encode('uspesno izmenjeni podaci'));
}

function obrisi_klijenta()
{   
    include ('../konekcija.php');
    $id_klijenta = $_POST['id_klijenta'];
    $upit1 = "DELETE FROM klijenti WHERE id_klijenta = '$id_klijenta'";
    $rezultat1 = $konekcija->prepare($upit1);
    $rezultat1->execute();
    $konekcija->close();
}

function provera_da_li_proizvod_postoji_u_bazi()
{
  include ('../konekcija.php');
  $ime_proizvoda = $_POST['ime_proizvoda'];
  $upit = "SELECT DISTINCT ime_proizvoda FROM proizvodi WHERE ime_proizvoda LIKE '$ime_proizvoda'";
  $rezultat = $konekcija->prepare($upit);
  $rezultat->execute();

  $rezultat->bind_result($ime_proizvoda_iz_baze);

  $rezultat_niz = array();

        while ($rezultat->fetch())
        {
         $rezultat_niz[]=array($ime_proizvoda_iz_baze);
       };
      $konekcija->close();
      exit(json_encode($rezultat_niz)); 
}
function unos_novog_proizvoda()
{
    include ('../konekcija.php');
    $ime_proizvoda = $_POST['ime_proizvoda'];
    $sirina = $_POST['sirina'];
    $visina = $_POST['visina'];
    $duzina = $_POST['duzina'];
    $cena_po_komadu = $_POST['cena_po_komadu'];
    $broj_komada = $_POST['broj_komada'];
    $cena_po_kubiku = $_POST['cena_po_kubiku'];
    $kubikaza = $_POST['kubikaza'];
    $ukupna_vrednost_u_dinarima = $_POST['ukupna_vrednost_u_dinarima'];
    $donji_limit = $_POST['donji_limit'];
 
    $upit="INSERT INTO proizvodi(id_korisnika,ime_proizvoda,sirina,visina,duzina,cena_po_komadu,broj_komada,cena_po_kubiku,ukupna_kubikaza,ukupna_vrednost_u_dinarima,donji_limit) VALUES('1','$ime_proizvoda','$sirina','$visina','$duzina','$cena_po_komadu','$broj_komada','$cena_po_kubiku','$kubikaza',$ukupna_vrednost_u_dinarima,'$donji_limit')";
      $rezultat = $konekcija->prepare($upit);
      $rezultat->execute();
      $konekcija->close();
      exit(json_encode('uspesno dodat novi proizvod'));
           
    
}


function pregled_magacina()
{
    include ('../konekcija.php');
    $upit = "SELECT @a:=@a+1 broj,id_proizvoda,ime_proizvoda,sirina,visina,duzina,cena_po_komadu,broj_komada,cena_po_kubiku,ukupna_kubikaza,ukupna_vrednost_u_dinarima,donji_limit FROM proizvodi, (SELECT @a:= 0) AS a WHERE id_korisnika = '1'";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($broj,$id_proizvoda,$ime_proizvoda,$sirina,$visina,$uzina,$cena_po_komadu,$broj_komada,$cena_po_kubiku,$ukupna_kubikaza,$ukupna_vrednost_u_dinarima,$donji_limit);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj,$id_proizvoda,$ime_proizvoda,$sirina,$visina,$uzina,$cena_po_komadu,$broj_komada,$cena_po_kubiku,$ukupna_kubikaza,$ukupna_vrednost_u_dinarima,$donji_limit);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz)); 
}

function pregled_ukupnih_vrednosti_magacina()
{   
     include ('../konekcija.php');
    $upit = "SELECT SUM(ukupna_vrednost_u_dinarima) AS 'sabrana_ukupna_vrednost_stanja',SUM(ukupna_kubikaza) AS 'sabrana_kubikaza'FROM proizvodi";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($sabrana_ukupna_vrednost_stanja,$sabrana_kubikaza);

    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($sabrana_ukupna_vrednost_stanja,$sabrana_kubikaza);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function prikazi_odredjenog_proizvod_pre_uredjivanja()
{
    include ('../konekcija.php');
    $id_proizvoda = $_POST['id_proizvoda'];
    $upit = "SELECT id_proizvoda,ime_proizvoda,sirina,visina,duzina,cena_po_kubiku,ukupna_kubikaza,donji_limit FROM proizvodi WHERE id_proizvoda = '$id_proizvoda'";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($id_proizvoda,$ime_proizvoda,$sirina,$visina,$duzina,$cena_po_kubiku,$ukupna_kubikaza,$donji_limit);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($id_proizvoda,$ime_proizvoda,$sirina,$visina,$duzina,$cena_po_kubiku,$ukupna_kubikaza,$donji_limit);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function izmena_podataka_proizvoda()
{
    include ('../konekcija.php');
    $id_proizvoda = $_POST['id_proizvoda'];

    $cena_po_kubiku = $_POST['cena_po_kubiku'];
    $cena_po_komadu = $_POST['cena_po_komadu'];
    $ukupna_vrednost_u_dinarima = $_POST['ukupna_vrednost_u_dinarima'];
    $donji_limit = $_POST['donji_limit'];

    $upit = "UPDATE proizvodi SET cena_po_komadu ='$cena_po_komadu',cena_po_kubiku = '$cena_po_kubiku',ukupna_vrednost_u_dinarima = '$ukupna_vrednost_u_dinarima', donji_limit = '$donji_limit' WHERE id_proizvoda = '$id_proizvoda'";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();
    $konekcija->close();
    exit(json_encode('uspesno izmenjeni podaci'));
}

function izmena_podataka_proizvoda_promenjena_kubikaza()
{
    include ('../konekcija.php');
    $id_proizvoda = $_POST['id_proizvoda'];
    $broj_komada = $_POST['broj_komada'];
    $cena_po_kubiku = $_POST['cena_po_kubiku'];
    $cena_po_komadu = $_POST['cena_po_komadu'];
    $ukupna_vrednost_u_dinarima = $_POST['ukupna_vrednost_u_dinarima'];
    $novi_unos_kubikaza = $_POST['novi_unos_kubikaza'];
    $donji_limit = $_POST['donji_limit'];

    $upit = "UPDATE proizvodi SET cena_po_komadu ='$cena_po_komadu',cena_po_kubiku = '$cena_po_kubiku',ukupna_vrednost_u_dinarima = '$ukupna_vrednost_u_dinarima', ukupna_kubikaza = '$novi_unos_kubikaza',broj_komada = '$broj_komada', donji_limit = '$donji_limit' WHERE id_proizvoda = '$id_proizvoda'";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();
    $konekcija->close();
    exit(json_encode('uspesno izmenjeni podaci'));
}

function obrisi_proizvod()
{   
    include ('../konekcija.php');
    $id_proizvoda = $_POST['id_proizvoda'];
    $upit1 = "DELETE FROM proizvodi WHERE id_proizvoda = '$id_proizvoda'";
    $rezultat1 = $konekcija->prepare($upit1);
    $rezultat1->execute();
    $konekcija->close();
}

function uzimanje_ukupnog_broja_redova_faktura()
{
  include ('../konekcija.php');
     $upit = "SELECT Count(*) FROM fakture";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($broj_redova);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj_redova);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}
function uzimanje_ukupnog_broja_redova_faktura_izvrsenih()
{
  include ('../konekcija.php');
     $upit = "SELECT Count(*) FROM fakture WHERE status_fakture = 'placena'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($broj_redova);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj_redova);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function prikaz_ukupne_vrednosti_izvrsenih_faktura()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
     include ('../konekcija.php');
     $upit = "SELECT SUM(poreska_osnovica) AS 'poreska_osnovica',SUM(ukupan_pdv_fakture) AS 'ukupan_pdv_fakture',SUM(ukupna_vrednost_fakture) AS 'ukupna_vrednost_fakture' FROM fakture WHERE status_fakture = 'placena'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function prikaz_ukupne_vrednosti_faktura_na_cekanju()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
     include ('../konekcija.php');
     $upit = "SELECT SUM(poreska_osnovica) AS 'poreska_osnovica',SUM(ukupan_pdv_fakture) AS 'ukupan_pdv_fakture',SUM(ukupna_vrednost_fakture) AS 'ukupna_vrednost_fakture' FROM fakture WHERE status_fakture = 'ne_placena'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function uzimanje_ukupnog_broja_redova_faktura_na_cekanju()
{
  include ('../konekcija.php');
     $upit = "SELECT Count(*) FROM fakture WHERE status_fakture = 'ne_placena'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($broj_redova);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj_redova);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}


function prikaz_ukupne_vrednosti_faktura()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
     include ('../konekcija.php');
     $upit = "SELECT SUM(poreska_osnovica) AS 'poreska_osnovica',SUM(ukupan_pdv_fakture) AS 'ukupan_pdv_fakture',SUM(ukupna_vrednost_fakture) AS 'ukupna_vrednost_fakture' FROM fakture";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function uzimanje_ukupnog_broja_redova_faktura_za_odredjenu_godinu()
{
  include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $upit = "SELECT Count(*) FROM fakture WHERE trenutna_godina = '$vrednost_selecta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($broj_redova);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj_redova);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_po_godinima()
{
  include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $upit = "SELECT Count(*) FROM fakture WHERE trenutna_godina = '$vrednost_selecta' AND status_fakture = 'placena'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($broj_redova);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj_redova);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}



function prikaz_ukupne_vrednosti_izvrsenih_faktura_po_godinama()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
     include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $upit = "SELECT SUM(poreska_osnovica) AS 'poreska_osnovica',SUM(ukupan_pdv_fakture) AS 'ukupan_pdv_fakture',SUM(ukupna_vrednost_fakture) AS 'ukupna_vrednost_fakture' FROM fakture WHERE status_fakture = 'placena' AND trenutna_godina = '$vrednost_selecta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_po_godinima()
{
  include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $upit = "SELECT Count(*) FROM fakture WHERE trenutna_godina = '$vrednost_selecta' AND status_fakture = 'ne_placena'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($broj_redova);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj_redova);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function prikaz_ukupne_vrednosti_faktura_na_cekanju_po_godinama()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
     include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $upit = "SELECT SUM(poreska_osnovica) AS 'poreska_osnovica',SUM(ukupan_pdv_fakture) AS 'ukupan_pdv_fakture',SUM(ukupna_vrednost_fakture) AS 'ukupna_vrednost_fakture' FROM fakture WHERE status_fakture = 'ne_placena' AND trenutna_godina = '$vrednost_selecta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function prikaz_ukupne_vrednosti_faktura_po_godinama()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
     include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $upit = "SELECT SUM(poreska_osnovica) AS 'poreska_osnovica',SUM(ukupan_pdv_fakture) AS 'ukupan_pdv_fakture',SUM(ukupna_vrednost_fakture) AS 'ukupna_vrednost_fakture' FROM fakture WHERE trenutna_godina = '$vrednost_selecta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}


function prikaz_svih_faktura_jednog_klijenta()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
    include ('../konekcija.php');
    $id_klijenta = $_POST['id_klijenta'];
    $upit = "SELECT @a:=@a+1 broj,id_fakture,ime_klijenta,datum_pravljenja_fakture,status_fakture,valuta_fakture,ukupna_vrednost_fakture FROM fakture, (SELECT @a:= 0) AS a WHERE id_klijenta = $id_klijenta ORDER BY id_fakture DESC";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($broj,$id_fakture,$ime_klijenta,$datum_pravljenja_fakture,$status_fakture,$valuta_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj,$id_fakture,$ime_klijenta,$datum_pravljenja_fakture,$status_fakture,$valuta_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function uzimanje_imena_kllijenta_za_naslov_svih_klijentovih_faktura()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
    include ('../konekcija.php');
    $id_klijenta = $_POST['id_klijenta'];
    $upit = "SELECT ime_klijenta FROM klijenti WHERE id_klijenta = $id_klijenta";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($ime_klijenta);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($ime_klijenta);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function obrisi_fakturu_sa_pocetne_strane_ili_iz_modala_pregled_svih_klijentovih_faktura()
{   
    include ('../konekcija.php');
    $id_fakture = $_POST['id_fakture'];
    $upit1 = "DELETE FROM fakture WHERE id_fakture = '$id_fakture'";
    $rezultat1 = $konekcija->prepare($upit1);
    $rezultat1->execute();
    $konekcija->close();
}




//PRIKAZ FAKTURE NA DOLE TRI FUNKCIJE

function prikazi_vrednosti_fakture_i_preuzmi_id_klijenta()
{   
    include ('../konekcija.php');
    $id_fakture = $_POST['id_fakture'];
    $upit = "SELECT id_klijenta,datum_pravljenja_fakture,valuta_fakture,nacin_placanja,poreska_osnovica,ukupan_pdv_fakture,ukupna_vrednost_fakture,redni_broj_fakture,trenutna_godina,status_fakture,informacija_o_stampanju_brojeva_slovima FROM fakture WHERE id_fakture = $id_fakture";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($id_klijenta,$datum_pravljenja_fakture,$valuta_fakture,$nacin_placanja,$poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture,$redni_broj_fakture,$trenutna_godina,$status_fakture,$informacija_o_stampanju_brojeva_slovima);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($id_klijenta,$datum_pravljenja_fakture,$valuta_fakture,$nacin_placanja,$poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture,$redni_broj_fakture,$trenutna_godina,$status_fakture,$informacija_o_stampanju_brojeva_slovima);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}


function preuzimanje_podataka_o_odabranom_klijentu()
{   
    include ('../konekcija.php');
    $id_odabranog_klijenta = $_POST['id_odabranog_klijenta'];
    $upit = "SELECT ime_klijenta,adresa_klijenta,pib_klijenta,maticni_br_klijenta,email_klijenta,telefon_klijenta,ziro_racun_klijenta FROM klijenti WHERE id_klijenta = $id_odabranog_klijenta";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($ime_klijenta,$adresa_klijenta,$pib_klijenta,$maticni_br_klijenta,$email_klijenta,$telefon_klijenta,$ziro_racun_klijenta);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($ime_klijenta,$adresa_klijenta,$pib_klijenta,$maticni_br_klijenta,$email_klijenta,$telefon_klijenta,$ziro_racun_klijenta);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function prikaz_artikala_redova_fakture()
{   
    include ('../konekcija.php');
    $id_fakture = $_POST['id_fakture'];
    $upit = "SELECT @a:=@a+1 broj,naziv_artikla,jedinica_mere,kolicina,cena_po_jedinici,poreska_osnovica,pdv,iznos_pdv,ukupna_vrednost FROM artikli_fakture, (SELECT @a:= 0) AS a WHERE id_fakture = $id_fakture";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($broj,$naziv_artikla,$jedinica_mere,$kolicina,$cena_po_jedinici,$poreska_osnovica,$pdv,$iznos_pdv,$ukupna_vrednost);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj,$naziv_artikla,$jedinica_mere,$kolicina,$cena_po_jedinici,$poreska_osnovica,$pdv,$iznos_pdv,$ukupna_vrednost);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

//PRIKAZ FAKTURE NA GORE TRI FUNKCIJE



function promena_statusa_fakture()
{   
    include ('../konekcija.php');
    $vrednost_selecta = $_POST['vrednost_selecta'];
    $id_odabrane_fakture = $_POST['id_odabrane_fakture'];

    $upit = "UPDATE fakture SET status_fakture = '$vrednost_selecta'WHERE id_fakture = '$id_odabrane_fakture'";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();
    $konekcija->close();
    exit(json_encode($vrednost_selecta));
}

function uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta()
{
  include ('../konekcija.php');
     $vrednost_selecta_ime_klijenta = $_POST['vrednost_selecta_ime_klijenta'];
     $upit = "SELECT Count(*) FROM fakture WHERE ime_klijenta = '$vrednost_selecta_ime_klijenta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($broj_redova);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj_redova);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent()
{
  include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $vrednost_selecta_ime_klijenta = $_POST['vrednost_selecta_ime_klijenta'];
     $upit = "SELECT Count(*) FROM fakture WHERE status_fakture = 'placena' AND ime_klijenta = '$vrednost_selecta_ime_klijenta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($broj_redova);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj_redova);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}
function uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent()
{
  include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $vrednost_selecta_ime_klijenta = $_POST['vrednost_selecta_ime_klijenta'];
     $upit = "SELECT Count(*) FROM fakture WHERE status_fakture = 'ne_placena' AND ime_klijenta = '$vrednost_selecta_ime_klijenta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($broj_redova);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj_redova);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function prikaz_ukupne_vrednosti_izvrsenih_faktura_za_sve_godine_i_odredjeni_klijent()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
     include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $vrednost_selecta_ime_klijenta = $_POST['vrednost_selecta_ime_klijenta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $upit = "SELECT SUM(poreska_osnovica) AS 'poreska_osnovica',SUM(ukupan_pdv_fakture) AS 'ukupan_pdv_fakture',SUM(ukupna_vrednost_fakture) AS 'ukupna_vrednost_fakture' FROM fakture WHERE status_fakture = 'placena' AND ime_klijenta = '$vrednost_selecta_ime_klijenta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function prikaz_ukupne_vrednosti_na_cekanju_faktura_za_sve_godine_i_odredjeni_klijent()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
     include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $vrednost_selecta_ime_klijenta = $_POST['vrednost_selecta_ime_klijenta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $upit = "SELECT SUM(poreska_osnovica) AS 'poreska_osnovica',SUM(ukupan_pdv_fakture) AS 'ukupan_pdv_fakture',SUM(ukupna_vrednost_fakture) AS 'ukupna_vrednost_fakture' FROM fakture WHERE status_fakture = 'ne_placena' AND ime_klijenta = '$vrednost_selecta_ime_klijenta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function prikaz_ukupne_vrednosti_ukupno_faktura_za_sve_godine_i_odredjeni_klijent()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
     include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $vrednost_selecta_ime_klijenta = $_POST['vrednost_selecta_ime_klijenta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $upit = "SELECT SUM(poreska_osnovica) AS 'poreska_osnovica',SUM(ukupan_pdv_fakture) AS 'ukupan_pdv_fakture',SUM(ukupna_vrednost_fakture) AS 'ukupna_vrednost_fakture' FROM fakture WHERE ime_klijenta = '$vrednost_selecta_ime_klijenta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function verifikacija_uzimanje_ukupnog_broja_redova_faktura_za_odredjenog_klijenta_i_odredjenu_godinu()
{
  include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $vrednost_selecta_ime_klijenta = $_POST['vrednost_selecta_ime_klijenta'];
     $upit = "SELECT Count(*) FROM fakture WHERE ime_klijenta = '$vrednost_selecta_ime_klijenta' AND trenutna_godina = '$vrednost_selecta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($broj_redova);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj_redova);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function uzimanje_ukupnog_broja_redova_faktura_izvrsenih_i_odredjeni_klijent_i_odredjena_godina()
{
  include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $vrednost_selecta_ime_klijenta = $_POST['vrednost_selecta_ime_klijenta'];
     $upit = "SELECT Count(*) FROM fakture WHERE ime_klijenta = '$vrednost_selecta_ime_klijenta' AND trenutna_godina = '$vrednost_selecta' AND status_fakture = 'placena'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($broj_redova);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj_redova);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}
function uzimanje_ukupnog_broja_redova_faktura_na_cekanju_i_odredjeni_klijent_i_odredjena_godina()
{
  include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $vrednost_selecta_ime_klijenta = $_POST['vrednost_selecta_ime_klijenta'];
     $upit = "SELECT Count(*) FROM fakture WHERE ime_klijenta = '$vrednost_selecta_ime_klijenta' AND trenutna_godina = '$vrednost_selecta' AND status_fakture = 'ne_placena'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($broj_redova);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj_redova);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}


function prikaz_ukupne_vrednosti_izvrsenih_faktura_za_odredjenu_godinu_i_odredjeni_klijent()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
     include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $vrednost_selecta_ime_klijenta = $_POST['vrednost_selecta_ime_klijenta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $upit = "SELECT SUM(poreska_osnovica) AS 'poreska_osnovica',SUM(ukupan_pdv_fakture) AS 'ukupan_pdv_fakture',SUM(ukupna_vrednost_fakture) AS 'ukupna_vrednost_fakture' FROM fakture WHERE status_fakture = 'placena' AND ime_klijenta = '$vrednost_selecta_ime_klijenta' AND trenutna_godina = '$vrednost_selecta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}


function prikaz_ukupne_vrednosti_na_cekanju_faktura_za_odredjenu_godinu_i_odredjeni_klijent()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
     include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $vrednost_selecta_ime_klijenta = $_POST['vrednost_selecta_ime_klijenta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $upit = "SELECT SUM(poreska_osnovica) AS 'poreska_osnovica',SUM(ukupan_pdv_fakture) AS 'ukupan_pdv_fakture',SUM(ukupna_vrednost_fakture) AS 'ukupna_vrednost_fakture' FROM fakture WHERE status_fakture = 'ne_placena' AND ime_klijenta = '$vrednost_selecta_ime_klijenta' AND trenutna_godina = '$vrednost_selecta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}


function prikaz_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
     include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $vrednost_selecta_ime_klijenta = $_POST['vrednost_selecta_ime_klijenta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $upit = "SELECT SUM(poreska_osnovica) AS 'poreska_osnovica',SUM(ukupan_pdv_fakture) AS 'ukupan_pdv_fakture',SUM(ukupna_vrednost_fakture) AS 'ukupna_vrednost_fakture' FROM fakture WHERE ime_klijenta = '$vrednost_selecta_ime_klijenta' AND trenutna_godina = '$vrednost_selecta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($poreska_osnovica,$ukupan_pdv_fakture,$ukupna_vrednost_fakture);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}

function uzimanje_broja_redova_ukupne_vrednosti_zajedno_faktura_za_odredjenu_godinu_i_odredjeni_klijent()  //prikaz ukupne vrednosti faktura na pocetnoj
{   
     include ('../konekcija.php');
     $vrednost_selecta = $_POST['vrednost_selecta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $vrednost_selecta_ime_klijenta = $_POST['vrednost_selecta_ime_klijenta']; //ODABRANA GODINA ZA PRIKAZ PROMETA
     $upit = "SELECT COUNT(*) FROM fakture WHERE ime_klijenta = '$vrednost_selecta_ime_klijenta' AND trenutna_godina = '$vrednost_selecta'";
     $rezultat = $konekcija->prepare($upit); 
     $rezultat->execute();
     $rezultat->bind_result($broj);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($broj);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
}



}



 ?>