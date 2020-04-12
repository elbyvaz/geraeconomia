$(".decimal").keypress(function() {	// only numbers, point and comma
   // Get ASCII value of key that user pressed
   let key = window.event.keyCode;

   // Was key that was pressed a numeric character (0-9)?
                                   // comma        // point
   if ( (key > 47 && key < 58) || (key == 44 ) || (key == 46) ) {
      return; // if so, do nothing
   } else {
      window.event.returnValue = null; // otherwise, discard character
    }
});

  $("#compare").click(function() {

    // Product 1
    let quantity_1 = document.getElementById('quantity_1').value;
    let unity_1 = document.getElementById('unity_1').value;
    let price_1 = document.getElementById('price_1').value;
    // Product 2
    let quantity_2 = document.getElementById('quantity_2').value;
    let unity_2 = document.getElementById('unity_2').value;
    let price_2 = document.getElementById('price_2').value;

    // replacing comma of decimal values for point to calculate without errors
    quantity_1 = quantity_1.replace(',', '.');
    price_1 = price_1.replace(',', '.');
    quantity_2 = quantity_2.replace(',', '.');
    price_2 = price_2.replace(',', '.');

    let result = document.getElementById('result');

    if ( unity_1 == unity_2 ) {
        calculate(unity_1, quantity_1, price_1, unity_2, quantity_2, price_2);
    } else { // differents unities

        if ( unity_1 == 'kg' || unity_1 == 'g' || unity_1 == 'mg' ) { // kg, g, mg

            if ( unity_2 != 'kg' && unity_2 != 'g' && unity_2 != 'mg' ) {// kg, g, mg

              result.style.display = "block";
              result.innerHTML = '<span>Inconsistência.</span> Unidades incompatíveis.';

            } else {

                calculate(unity_1, quantity_1, price_1, unity_2, quantity_2, price_2);

            }

        }

        else if ( unity_1 == 'l' || unity_1 == 'ml' ) { // l, ml

            if (unity_2 != 'l' && unity_2 != 'ml' ) { // l, ml

              result.style.display = "block";
              result.innerHTML = '<span>Inconsistência.</span> Unidades incompatíveis.';

            } else { // tudo ok

                calculate(unity_1, quantity_1, price_1, unity_2, quantity_2, price_2);

            }

        }

        else if ( unity_1 == 'm' || unity_1 == 'cm' || unity_1 == 'mm' ) { // m, cm, mm

            if (unity_2 != 'm' && unity_2 != 'cm' && unity_2 != 'mm' ) { // m, cm, mm

              result.style.display = "block";
              result.innerHTML = '<span>Inconsistência.</span> Unidades incompatíveis.';

            } else { // tudo ok

                calculate(unity_1, quantity_1, price_1, unity_2, quantity_2, price_2);

            }

        }

        else if ( unity_1 == 'unidade' ) { // unidade

            if (unity_2 != 'unidade' ) { // unidade

              result.style.display = "block";
              result.innerHTML = '<span>Inconsistência.</span> Unidades incompatíveis.';

            } else {

                calculate(unity_1, quantity_1, price_1, unity_2, quantity_2, price_2);

            }

        }

    }

  });

  function calculate(unity_1, quantity_1, price_1, unity_2, quantity_2, price_2) {

    let economy;

    if ( unity_1 == 'kg' ) { // transforming to the smallest unit of measure

        quantity_1 *= 1000000; // transforming to milimeter (mg)

    } else if ( unity_1 == 'g' || unity_1 == 'l' || unity_1 == 'm' ) { // g ou l ou m

        quantity_1 *= 1000; // transforming to miligrama (mg), mililitro (ml) ou milimetro (mm)

    } else if ( unity_1 == 'cm' ) { // cm

        quantity_1 *= 10; // transforming to milimetro (mm)

    }

    if ( unity_2 == 'kg' ) { // transforming to the smallest unit of measure

        quantity_2 *= 1000000; // transforming to miligrama (mg)

    } else if ( unity_2 == 'g' || unity_2 == 'l' || unity_2 == 'm' ) { // g ou l ou m

        quantity_2 *= 1000; // transforming to miligrama (mg), mililitro (ml) ou milimetro (mm)

    } else if ( unity_2 == 'cm' ) { // cm

        quantity_2 *= 10; // transforming to milimetro (mm)

    }

    economy = quantity_1 * price_2 / quantity_2;

    if ( economy > price_1 ) {

        let percentage = 100 - (price_1 * 100 / economy);

        result.style.display = "block";
        result.innerHTML = 'Comprando o <span>Produto 1</span>, sua economia será de <span>'+ percentage.toFixed(2) +'%</span>';

    } else if ( economy < price_1 ) {

        percentage = 100 - (economy * 100 / price_1);

        result.style.display = "block";
        result.innerHTML = 'Comprando o <span>Produto 2</span>, sua economia será de <span>'+ percentage.toFixed(2) +'%</span>';

    } else {

      result.style.display = "block";
      result.innerHTML = '<span>Não há economia</span> entre os 2 produtos.';

    }

  }
