/************************************************************************
 *
 *  arabic.js
 *
 *  ---------------------------------------------------------------------
 *
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2015 Queen Rania Foundation (Edraak.org)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 */

(function () {
  /*************************************************************
   * Just a dummy separator between modules.
   * TOOD: Add some documentation for the module bellow.
   *
   */
  MathJax.Hub.Config({
    'HTML-CSS': {
      // TODO: Make the font configurable by user
      undefinedFamily: 'Amiri'
    },
    styles: {
      '.mfliph': {
        'display': 'inline-block !important',
        '-moz-transform': 'scaleX(-1)',
        '-webkit-transform': 'scaleX(-1)',
        '-o-transform': 'scaleX(-1)',
        'transform': 'scaleX(-1)',
        '-ms-filter': 'fliph',
        'filter': 'fliph'
      },
      '.mar': {
        // TODO: Make the font configurable by user
        'font-family': 'Amiri !important',
        'font-style': 'normal !important',
      },
    },
    TeX: {
      // TODO: Review the dependecies!
      extensions: ['HTML.js'],
    }
  });


  /*************************************************************
   * Just a dummy separator between modules.
   * TOOD: Add some documentation for the module bellow.
   *
   */
  var NUMBERS_MAP = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
    '\\.': '٫' // Decimal mark
  };


  /*************************************************************
   * Just a dummy separator between modules.
   * TOOD: Add some documentation for the module bellow.
   *
   */
  var OPERATORS_MAP = {
    // English to Arabic comma
    ',': '،'
  };


  /*************************************************************
   * Just a dummy separator between modules.
   * TOOD: Add some documentation for the module bellow.
   *
   */
  // TODO: Perhaps even this should be configurable!
  var IDENTIFIERS_MAP = {
    // Math functions
    'sin': 'جا',
    'cos': 'جتا',
    'tan': 'ظا',

    // Variable name
    'a': 'ا',

    // Variable name
    // TODO: Use Arabic letter dotless beh 0x66e instead
    'b': 'ب',

    // Variable name.
    // Suffixed with Unicdoe Arabic tatweel 0x0640
    'c': 'حـ',

    // Mixed use (Function, variable and (dx))
    'd': 'د',

    // Mixed use. With Unicdoe Arabic tatweel 0x0640
    'e': 'هـ',

    // Energy
    'E': 'ط',

    // Function name
    // TODO: Use dotless qaf (ٯ) instead
    'f': 'ق',

    // Function name
    'g': 'د',

    // Mixed use
    'k': 'ك',

    // Variable name
    'n': 'ن',

    // Meter
    'm': 'م',

    // Initial charge
    'q': 'ش',

    // Mixed use
    'r': 'ر',
    't': 'ت',

    // Variable names
    'x': 'س',
    'y': 'ص',
    'z': 'ع'
  };


  /*************************************************************
   * Just a dummy separator between modules.
   * TOOD: Add some documentation for the module bellow.
   *
   */
  MathJax.Hub.Register.StartupHook('TeX HTML Ready', function() {
    var TEX = MathJax.InputJax.TeX;
    var TEXDEF = TEX.Definitions;

    TEXDEF.Add({
      macros: {
        'ar': 'HandleArabic',
        'alwaysar': 'MarkAsArabic',
        'fliph': 'HandleFlipHorizontal',

        'lspeed': 'LightSpeedAr',
        'scnd': 'SecondsAr',
        'Plancks': 'PlancksAr',
        'Boltzmanns': 'BoltzmannsAr',
        'zero': 'ZeroAr',
        'epsilonzero': 'EpsilonZeroAr',

        'AM': 'AirMassAr',
        'Mega': 'MegaAr',
        'nano': 'NanoAr',
        'Giga': 'GigaAr',
        'Tera': 'TeraAr',
        'kilo': 'KiloAr',
        'volt': 'VoltAr',
        'Amp': 'AmpAr',
        'Klvn': 'KilvenAr',
        'ph': 'PHAr',
        'F': 'FaradAr',
        'ek': 'EKAr',
        'hole': 'HoleAr',
        'elctrn': 'ElectronAr',
        'hour': 'HourAr',
        'Watt': 'WattAr',
        'max': 'MaxAr',

        'micro': 'MicroAr',
        'cm': 'CentimeterAr',
        'day': 'DayAr',
        'year': 'YearAr',

        'er': 'EspsilonRAr',

        'J': 'CurrentDensityAr',
        'FF': 'FillFactorAr',
        'V': 'VoltageAr',
        'oc': 'OpenCircuitAr',
        'D': 'SpreadCoefficientAr',
        'rad': 'RadiationAr',
        'Tmpr': 'TemratureAr',
        'current': 'CurrentAr',
        'NA': 'ConcentrationReceiverAtomAr',
        'ND': 'ConcentrationDonorAtomAr',
        'nii': 'ConcentrationCarierPureAr',
        'Wd': 'DeplationAreaWidthAr',
        'Ld': 'DiffusionLengthAr',
        'sc': 'ShortCircuitAr',

        // Light power
        'P': 'PhotovoltaicEnergyAr',
        'inn': 'INAr',

        'grm': 'GramAr',
        'mue': 'ElectronsMotionConstantAr',
        'diffe': 'DiffusionElectronsAr',



        // Solar Energy Part #2
        //   'mass': 'MaterialMassAr', 'm', 'ك',
        //   'capacity': 'CapacityAr': 'C', 'ح',
        //   'materialheat': 'MaterialHeat': 'p', 'ن',
        //   'temperature': 'Temperature': 'T', 'د',
        //   'latentheat': 'LatentHeat': 'Q', 'ح_ك',
        //   'latentenergy': 'LatentEnergy': '\\lambda', 'ط_ك',
        //   'heatflux': 'HeatFlux': 'Q_\\text{cond}', 'ح_ت',
        //   'thermalconduct': 'ThermalConductivity': 'K', 'ت_ح',
        //   'area': 'Area': 'A', 'م',
        //   'heattransfcoeff': 'HeatTransferCoefficient': 'h', 'م.ح',
        //
      }
    });

    var ArabicTeX = function(english, arabic) {
      return function(name) {
        var tex;
        if ('ar' === this.stack.env.lang) {
          tex = arabic;
        } else {
          tex = english;
        }

        this.Push(TEX.Parse(tex).mml());
      };
    };

    var ArabicText = function(english, arabicText) {
      return ArabicTeX(english, '\\fliph{\\text{' + arabicText + '}}');
    };

    var ArabicTextWithSpace = function(english, arabicText) {
      var arabic = '\\ \\fliph{\\text{' + arabicText + '}}';

      return function(name) {
        var tex;
        if ('ar' === this.stack.env.lang) {
          this.Push(TEX.Parse(arabic).mml());
        } else {
          this.Push(TEX.Parse(english).mml());
        }
      };
    };

    var ArabicSymbols = function(english, arabicSymbols) {
      var arabicTeX = arabicSymbols.replace(
        /([\u0600-\u06FF]+)/g, // Match Arabic language
        '\\fliph{\\text{$1}}'
      );

      return ArabicTeX(english, arabicTeX);
    };

    var texParseMMLToken = TEX.Parse.prototype.mmlToken;

    TEX.Parse.Augment({
      HandleArabic: function(name) {
        // TODO: Make the `documentElement.lang` check configurable
        var pageLang = document.documentElement.lang;
        if (pageLang === 'ar') {
          this.MarkAsArabic(name);
        }
      },
      MarkAsArabic: function(name) {
        this.stack.env.lang = 'ar';

        var arg = this.GetArgumentMML(name);

        this.Push(this.flipHorizontal(arg).With({
          lang: 'ar'
        }));
      },
      HandleFlipHorizontal: function(name) {
        var arg = this.GetArgumentMML(name);
        this.Push(this.flipHorizontal(arg));
      },
      flipHorizontal: function(token) {
        return token.With({
          fliph: !token.Get('fliph')
        });
      },
      arabicNumber: function(token) {
        var text = token.data[0].data[0];
        var mapped = text;

        if ('0' === mapped) {
          // Special case for the Arabic zero
          mapped = 'صفر';
        } else {
          Object.keys(NUMBERS_MAP).forEach(function(arabicNumber) {
            var hindiNumber = NUMBERS_MAP[arabicNumber];
            var regex = new RegExp('' + arabicNumber, 'g');
            mapped = mapped.replace(regex, hindiNumber);
          });
        }

        if (mapped !== text) {
          token.data[0].data[0] = mapped;
          token = token.With({
            fontLang: 'ar'
          });
        }

        return this.flipHorizontal(token);
      },
      arabicIdentifier: function(token) {
        var text = token.data[0].data[0];
        var mapped = text;

        if ('chars' === token.data[0].type) {
          // English Symbols like X and Y
          Object.keys(IDENTIFIERS_MAP).forEach(function(enChar) {
            var arChar = IDENTIFIERS_MAP[enChar];
            var regex = new RegExp(enChar, 'g');
            mapped = mapped.replace(regex, arChar);
          });
        }

        if (mapped !== text) {
          token.data[0].data[0] = mapped;
          token = token.With({
            fontLang: 'ar'
          });
        }

        return this.flipHorizontal(token);
      },
      arabicOperator: function(token) {
        var text = token.data[0].data[0];
        var mapped = text;

        Object.keys(OPERATORS_MAP).forEach(function(enOperator) {
          var regex = new RegExp('' + enOperator, 'g');
          var arOperator = OPERATORS_MAP[enOperator];
          mapped = mapped.replace(regex, arOperator);
        });

        if (mapped !== text) {
          token = this.flipHorizontal(token).With({
            fontLang: 'ar'
          });

          token.data[0].data[0] = mapped;
        }

        return token;
      },
      mmlToken: function(token) {
        // TODO: Check for possible incomparability with boldsymbol
        // extension
        var token = texParseMMLToken.apply(this, [token]);

        if ('ar' === this.stack.env.lang) {
          if ('mn' === token.type) {
            token = this.arabicNumber(token);
          } else if ('mi' === token.type) {
            token = this.arabicIdentifier(token);
          } else if ('mo' === token.type) {
            token = this.arabicOperator(token);
          }
        }

        return token;
      },
      LightSpeedAr: ArabicText('c', 'سرعة الضوء'),
      PlancksAr: ArabicText('\\hbar', 'ثابت بلانك'),
      BoltzmannsAr: ArabicText('k', 'ثابت بولتزمان'),
      SecondsAr: ArabicText('s', 'ث'),

      AirMassAr: ArabicText('AM', 'كتلة هواء'),

      MegaAr: ArabicText('M', 'ميجا'),
      NanoAr: ArabicText('n', 'نانو'),
      GigaAr: ArabicText('G', 'جيجا'),
      TeraAr: ArabicText('T', 'تيرا'),
      KiloAr: ArabicText('k', 'كيلو'),

      VoltAr: ArabicText('v', 'فولت'),
      AmpAr: ArabicText('A', 'امبير'),
      KilvenAr: ArabicText('K', 'كلفن'),
      PHAr: ArabicText('ph', 'ف'),
      FaradAr: ArabicText('F', 'فاراد'),
      EKAr: ArabicText('e', 'انتشار،ك'),
      HoleAr: ArabicText('p', 'ثقب'),
      ElectronAr: ArabicText('n', 'الكترون'),
      HourAr: ArabicText('h', 'ساعة'),
      WattAr: ArabicText('W', 'واط'),
      MaxAr: ArabicText('p', 'اقصى'),

      MicroAr: ArabicText('\\mu', 'مايكرو'),
      CentimeterAr: ArabicText('\\text{cm}', 'سم'),
      DayAr: ArabicText('\\text{day}', 'يوم'),
      YearAr: ArabicText('\\text{year}', 'سنة'),

      GramAr: ArabicText('g', 'غرام'),

      EspsilonRAr: ArabicTeX('\\epsilon{}r', '\\fliph{\\epsilon{}r}'),
      EpsilonZeroAr: ArabicTeX(
        '\\varepsilon_\\zero',
        '\\fliph{\\varepsilon_\\zero}'
      ),
      ZeroAr: ArabicTeX('0', '\\text{0}'),

      CurrentDensityAr: ArabicSymbols('J', 'ك.ت'),
      FillFactorAr: ArabicSymbols('FF', 'ع.ت'),
      VoltageAr: ArabicSymbols('V', 'جـ'),
      OpenCircuitAr: ArabicSymbols('oc', 'م'),
      SpreadCoefficientAr: ArabicSymbols('D', 'م'),
      RadiationAr: ArabicSymbols('l', 'ع'),
      TemratureAr: ArabicSymbols('T', 'د'),
      CurrentAr: ArabicSymbols('I', 'ت'),
      ConcentrationReceiverAtomAr: ArabicSymbols('NA', 'ن_ق'),
      ConcentrationDonorAtomAr: ArabicSymbols('ND', 'ن_م'),
      ConcentrationCarierPureAr: ArabicSymbols('ni', 'ن_ك'),
      DeplationAreaWidthAr: ArabicSymbols('W', 'ل_ن'),
      DiffusionLengthAr: ArabicSymbols('L_d', 'ل_ر'),
      ShortCircuitAr: ArabicSymbols('sc', 'ق'),
      PhotovoltaicEnergyAr: ArabicSymbols('P', 'ط'),
      INAr: ArabicSymbols('in', 'د'),

      ElectronsMotionConstantAr: ArabicTeX('\\mu{}e', '\\fliph{\\mu{}e}'),
      DiffusionElectronsAr: ArabicSymbols('\\text{diff},e', 'ن\\ ك'),
    });
  });


  /*************************************************************
   * Just a dummy separator between modules.
   * TOOD: Add some documentation for the module bellow.
   *
   */
  MathJax.Hub.Register.StartupHook('mml Jax Ready', function() {
    MathJax.Hub.Register.StartupHook('HTML-CSS Jax Ready', function() {
      var MML = MathJax.ElementJax.mml;

      var mnToHTML = MML.mn.prototype.toHTML;

      var flipHorizontalElement = function(token, element) {
        var className = '';

        if ('ar' === token.Get('fontLang')) {
          className += ' ' + 'mar';
        }

        if (token.Get('fliph')) {
          var flipElement = document.createElement('span');
          className += ' ' + 'mfliph';

          flipElement.className += ' ' + className;

          if (Node.TEXT_NODE === element.firstChild.nodeType) {
            flipElement.textContent = element.textContent;
            element.textContent = '';
          } else {
            while (element.childNodes.length) {
              flipElement.appendChild(element.firstChild);
            }
          }

          element.appendChild(flipElement);
        } else {
          element.className += ' ' + className;
        }
      };

      var miToHTML = MML.mi.prototype.toHTML;
      MML.mi.Augment({
        toHTML: function(span) {
          var element = miToHTML.apply(this, [span]);

          if (Node.TEXT_NODE === element.firstChild.nodeType) {
            flipHorizontalElement(this, element);
          } else {
            flipHorizontalElement(this, element.firstChild);
          }

          return element;
        }
      });

      ['mn', 'mo', 'mtext', 'msubsup', 'mrow'].forEach(function(name) {
        var originalToHTML = MML[name].prototype.toHTML;

        MML[name].Augment({
          toHTML: function(span) {
            var element = originalToHTML.apply(this, [span]);
            flipHorizontalElement(this, element);
            return element;
          }
        });
      });
    });
  });

  /*************************************************************
   * Just a dummy separator between modules.
   * TOOD: Add some documentation for the module bellow.
   *
   */
  MathJax.Ajax.loadComplete("[Contrib]/arabic/arabic.js");
}());
