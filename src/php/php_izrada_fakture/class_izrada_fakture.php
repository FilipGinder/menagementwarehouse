<?php 
class izrada_faktura
{
	
	function prikaz_imena_klijenata_za_select()
	{
    include ('../konekcija.php');
    $upit = "SELECT ime_klijenta FROM klijenti WHERE id_korisnika = '1'";
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


  function select_popuna_podataka_klijenta()
  {
    include ('../konekcija.php');
    $ime_klijenta = $_POST['ime_klijenta'];

    $upit = "SELECT DISTINCT id_klijenta,ime_klijenta,adresa_klijenta,pib_klijenta,maticni_br_klijenta,email_klijenta,telefon_klijenta,ziro_racun_klijenta FROM klijenti WHERE ime_klijenta LIKE '$ime_klijenta'";
                    $rezultat = $konekcija->prepare($upit);
                    $rezultat->execute();

                    $rezultat->bind_result($id_klijenta,$ime_klijenta,$adresa_klijenta,$pib_klijenta,$maticni_br_klijenta,$email_klijenta,$telefon_klijenta,$ziro_racun_klijenta);

                    $rezultat_niz = array();

                          while ($rezultat->fetch())
                          {
                           $rezultat_niz[]=array($id_klijenta,$ime_klijenta,$adresa_klijenta,$pib_klijenta,$maticni_br_klijenta,$email_klijenta,$telefon_klijenta,$ziro_racun_klijenta);
                         };
                    $konekcija->close();
                         exit(json_encode($rezultat_niz));
  }

  function punjenje_selekta_sa_imenima_proizvoda()
  {
    include ('../konekcija.php');
    $upit = "SELECT ime_proizvoda FROM proizvodi WHERE id_korisnika = '1'";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($ime_proizvoda);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($ime_proizvoda);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
  }
  function cuvanje_osnovnih_podataka_o_fakturi()
  {
    include ('../konekcija.php');
    $id_klijenta = $_POST['id_klijenta'];
    $datum_izrade_fakture = $_POST['datum_izrade_fakture'];
    $izabrana_valuta = $_POST['izabrana_valuta'];
    $nacin_placanja = $_POST['nacin_placanja'];
    $redni_broj_fakture = $_POST['redni_broj_fakture'];
    $danasnja_godina = $_POST['danasnja_godina'];
    $ime_klijenta = $_POST['ime_klijenta'];
    $informacija_o_stampanju_brojeva_slovima = $_POST['informacija_o_stampanju_brojeva_slovima'];

    $upit="INSERT INTO fakture(id_klijenta,ime_klijenta,datum_pravljenja_fakture,status_fakture,redni_broj_fakture,  trenutna_godina,valuta_fakture,nacin_placanja,informacija_o_stampanju_brojeva_slovima) VALUES('$id_klijenta','$ime_klijenta','$datum_izrade_fakture','ne_placena','$redni_broj_fakture','$danasnja_godina','$izabrana_valuta','$nacin_placanja','$informacija_o_stampanju_brojeva_slovima')";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();

    $IDtog_novog_reda_u_bazi = mysqli_insert_id($konekcija); //i ovim odmah vracamo ID tog novog reda u bazi
    $konekcija->close();
    exit(json_encode($IDtog_novog_reda_u_bazi));
  }

  function odabir_proizvoda_iz_dataliste_za_unos_u_fakturu()
  {
    include ('../konekcija.php');
    $izabrani_proizvod = $_POST['izabrani_proizvod'];
    $upit = "SELECT cena_po_kubiku,ukupna_kubikaza,id_proizvoda FROM proizvodi WHERE ime_proizvoda = '$izabrani_proizvod'";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($cena_po_kubiku,$ukupna_kubikaza,$id_proizvoda);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($cena_po_kubiku,$ukupna_kubikaza,$id_proizvoda);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
  }

  function unos_vrednosti_jednog_reda_fakture_u_bazu()
  {
    include ('../konekcija.php');
    $id_fakture = $_POST['id_fakture'];
    $naziv_proizvoda = $_POST['naziv_proizvoda'];
    $jedinica_mere = $_POST['jedinica_mere'];
    $kolicina = $_POST['kolicina'];
    $cena_po_jedinici = $_POST['cena_po_jedinici'];
    $poreska_osnovica = $_POST['poreska_osnovica'];
    $pdv = $_POST['pdv'];
    $iznos_pdv = $_POST['iznos_pdv'];
    $ukupna_vrednost = $_POST['ukupna_vrednost'];

    $upit="INSERT INTO artikli_fakture(id_fakture,naziv_artikla,jedinica_mere,kolicina,cena_po_jedinici,poreska_osnovica,pdv,iznos_pdv,ukupna_vrednost) 

    VALUES('$id_fakture','$naziv_proizvoda','$jedinica_mere','$kolicina','$cena_po_jedinici','$poreska_osnovica','$pdv','$iznos_pdv','$ukupna_vrednost')";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();

    $IDtog_novog_reda_u_bazi = mysqli_insert_id($konekcija); //i ovim odmah vracamo ID tog novog reda u bazi
    $konekcija->close();
    exit(json_encode($IDtog_novog_reda_u_bazi));
  }

  function izbrisi_odredjeni_red_iz_fakture()
  {
    include ('../konekcija.php');
    $id_reda_u_fakturi = $_POST['id_reda_u_fakturi'];
    $upit1 = "DELETE FROM artikli_fakture WHERE id_artikla_fakture = '$id_reda_u_fakturi'";
    $rezultat1 = $konekcija->prepare($upit1);
    $rezultat1->execute();
    $konekcija->close();

    exit(json_encode('Uspesno obrisan red'));
  }

  function ispis_trenuto_ukupne_cifre_na_fakturie()
  {
    include ('../konekcija.php');
    $id_fakture = $_POST['id_fakture'];
    $upit = "SELECT SUM(ukupna_vrednost) AS 'ukupna_vrednost' FROM artikli_fakture WHERE id_fakture = '$id_fakture'";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($ukupna_vrednost);

    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($ukupna_vrednost);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
  }

  function obrisi_fakturu_u_izradi()
  {
    include ('../konekcija.php');
    $id_fakture = $_POST['id_fakture'];
    $upit1 = "DELETE FROM fakture WHERE id_fakture = '$id_fakture'";
    $rezultat1 = $konekcija->prepare($upit1);
    $rezultat1->execute();
    $konekcija->close();

    exit(json_encode('Uspesno obrisana faktura'));
  }

  function prikaz_rednog_broja_i_godine_pravljenja_fakture()
  {
    include ('../konekcija.php');
    $upit = "SELECT redni_broj_fakture,trenutna_godina FROM fakture  ORDER BY id_fakture DESC LIMIT 1";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($redni_broj_fakture,$trenutna_godina);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($redni_broj_fakture,$trenutna_godina);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
  }

  function izracunaj_ukupnu_vrednost_za_fakturu()
  {
    include ('../konekcija.php');
    $id_fakture = $_POST['id_fakture'];
    $upit = "SELECT SUM(poreska_osnovica) AS 'poreska_osnovica', SUM(iznos_pdv) AS 'iznos_pdv',SUM(ukupna_vrednost) AS 'ukupna_vrednost' FROM artikli_fakture WHERE id_fakture = '$id_fakture'";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($poreska_osnovica,$iznos_pdv,$ukupna_vrednost);

    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($poreska_osnovica,$iznos_pdv,$ukupna_vrednost);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
  }

   function sacuvaj_u_bazu_podatke_o_ukupnoj_vrednosti_za_fakturu()
  {
    include ('../konekcija.php');
    $id_fakture = $_POST['id_fakture'];
    $ukupna_poreska_osnovica_za_ovu_fakturu = $_POST['ukupna_poreska_osnovica_za_ovu_fakturu'];
    $ukupan_iznos_pdv_za_ovu_fakturu = $_POST['ukupan_iznos_pdv_za_ovu_fakturu'];
    $ukupna_vrednost_za_ovu_fakturu = $_POST['ukupna_vrednost_za_ovu_fakturu'];

     $upit = "UPDATE fakture SET poreska_osnovica = '$ukupna_poreska_osnovica_za_ovu_fakturu', ukupan_pdv_fakture = '$ukupan_iznos_pdv_za_ovu_fakturu', ukupna_vrednost_fakture = '$ukupna_vrednost_za_ovu_fakturu' WHERE id_fakture = '$id_fakture'";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();
    $konekcija->close();
    exit(json_encode('uspesno izmenjeni podaci'));
  }


 
 function provera_da_li_izabranog_proizvoda_ima_dovoljno_na_stanju()
 {
    include ('../konekcija.php');
    $naziv_proizvoda = $_POST['naziv_proizvoda'];
   
    $upit = "SELECT ukupna_kubikaza,id_proizvoda FROM proizvodi  WHERE ime_proizvoda = '$naziv_proizvoda'";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($ukupna_kubikaza,$id_proizvoda);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($ukupna_kubikaza,$id_proizvoda);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
 }
 function uzimanje_informacija_o_proizvodu_zbog_umanjenja_stanja()
  {
    include ('../konekcija.php');
    $naziv_proizvoda = $_POST['naziv_proizvoda'];
   
    $upit = "SELECT sirina,visina,duzina,cena_po_kubiku,ukupna_kubikaza FROM proizvodi  WHERE ime_proizvoda = '$naziv_proizvoda'";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($sirina,$visina,$duzina,$cena_po_kubiku,$ukupna_kubikaza);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($sirina,$visina,$duzina,$cena_po_kubiku,$ukupna_kubikaza);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
  }


function funkcija_za_umanjivanje_stanja_magacina_fakturom()
  {
    include ('../konekcija.php');
    $naziv_proizvoda = $_POST['naziv_proizvoda'];
    $kubikaza = $_POST['kubikaza'];
    $broj_komada = $_POST['broj_komada'];
    $ukupna_vrednost_u_dinarima = $_POST['ukupna_vrednost_u_dinarima'];
    $cena_po_komadu = $_POST['cena_po_komadu'];

      $upit = "UPDATE proizvodi SET cena_po_komadu = '$cena_po_komadu', broj_komada = '$broj_komada', ukupna_kubikaza = '$kubikaza',ukupna_vrednost_u_dinarima = '$ukupna_vrednost_u_dinarima' WHERE ime_proizvoda = '$naziv_proizvoda'";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();
    $konekcija->close();
    exit(json_encode('uspesno izmenjeni podaci'));
  }




   function uzimanje_informacija_o_proizvodu_zbog_uvecanja_stanja()
  {
    include ('../konekcija.php');
    $id_odabranog_proizvoda = $_POST['id_odabranog_proizvoda'];
   
    $upit = "SELECT sirina,visina,duzina,cena_po_kubiku,ukupna_kubikaza FROM proizvodi  WHERE id_proizvoda = '$id_odabranog_proizvoda'";
    $rezultat = $konekcija->prepare($upit); 
    $rezultat->execute();
    $rezultat->bind_result($sirina,$visina,$duzina,$cena_po_kubiku,$ukupna_kubikaza);


    $rezultat_niz = array();

          while ($rezultat->fetch())
          {
           $rezultat_niz[]=array($sirina,$visina,$duzina,$cena_po_kubiku,$ukupna_kubikaza);
          }
          $konekcija->close();
      exit(json_encode($rezultat_niz));
  }

  function funkcija_za_uvecanje_stanja_magacina_brisanjem_jednog_reda()
  {
    include ('../konekcija.php');
    $id_odabranog_proizvoda = $_POST['id_odabranog_proizvoda'];
    $kubikaza = $_POST['kubikaza'];
    $broj_komada = $_POST['broj_komada'];
    $ukupna_vrednost_u_dinarima = $_POST['ukupna_vrednost_u_dinarima'];
    $cena_po_komadu = $_POST['cena_po_komadu'];

      $upit = "UPDATE proizvodi SET cena_po_komadu = '$cena_po_komadu', broj_komada = '$broj_komada', ukupna_kubikaza = '$kubikaza',ukupna_vrednost_u_dinarima = '$ukupna_vrednost_u_dinarima' WHERE id_proizvoda = '$id_odabranog_proizvoda'";
    $rezultat = $konekcija->prepare($upit);
    $rezultat->execute();
    $konekcija->close();
    exit(json_encode('uspesno izmenjeni podaci'));
  }
}
?>