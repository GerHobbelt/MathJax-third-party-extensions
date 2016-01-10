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

(function() {
  var TEX_JAX_ARABIC_SUPPORT = function() {
    MathJax.Hub.Config({
      TeX: {
        // TODO: Review the dependecies!
        extensions: ['HTML.js'],
      }
    });

    MathJax.Hub.Register.StartupHook('TeX HTML Ready', function() {
      var TEX = MathJax.InputJax.TeX;
      var TEXDEF = TEX.Definitions;

      TEXDEF.Add({
        macros: {
          'ar': 'HandleArabic',
          'alwaysar': 'MarkAsArabic',
          'fliph': 'HandleFlipHorizontal'
        }
      });

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
        }
      });
    });
  };

  var ARABIC_UNITS_GENERATOR = (function() {
    var TEX = MathJax.InputJax.TeX;

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

    var macros = {
      // amplifiers
      "MegaAr": ["Mega", ArabicText('M', 'ميجا')],
      "NanoAr": ["nano", ArabicText('n', 'نانو')],
      "GigaAr": ["Giga", ArabicText('G', 'جيجا')],
      "TeraAr": ["Tera", ArabicText('T', 'تيرا')],
      "KiloAr": ["kilo", ArabicText('k', 'كيلو')],
      "MicroAr": ["micro", ArabicText('\\mu', 'مايكرو')],

      // math
      "ZeroAr": ["zero", ArabicTeX('0', '\\text{0}')],

      // misc
      "MaxAr": ["max", ArabicText('p', 'اقصى')],

      // physUnits
      "SecondsAr": ["scnd", ArabicText('s', 'ث')],
      "HourAr": ["hour", ArabicText('h', 'ساعة')],
      "DayAr": ["day", ArabicText('\\text{day}', 'يوم')],
      "YearAr": ["year", ArabicText('\\text{year}', 'سنة')],
      "AmpAr": ["Amp", ArabicText('A', 'امبير')],
      "VoltAr": ["volt", ArabicText('v', 'فولت')],
      "KilvenAr": ["Klvn", ArabicText('K', 'كلفن')],
      "HoleAr": ["hole", ArabicText('p', 'ثقب')],
      "WattAr": ["Watt", ArabicText('W', 'واط')],
      "FaradAr": ["F", ArabicText('F', 'فاراد')],
      "CentimeterAr": ["cm", ArabicText('\\text{cm}', 'سم')],
      "GramAr": ["grm", ArabicText('g', 'غرام')],

      // chmUnits
      "PHAr": ["ph", ArabicText('ph', 'ف')],
      "ElectronAr": ["elctrn", ArabicText('n', 'الكترون')],

      // pyhsConsts
      "LightSpeedAr": ["lspeed", ArabicText('c', 'سرعة الضوء')],
      "PlancksAr": ["Plancks", ArabicText('\\hbar', 'ثابت بلانك')],
      "BoltzmannsAr": ["Boltzmanns", ArabicText('k', 'ثابت بولتزمان')],
      "EpsilonZeroAr": ["epsilonzero", ArabicTeX('\\varepsilon_\\zero', '\\fliph{\\varepsilon_\\zero}')],

      // physNames
      "AirMassAr": ["AM", ArabicText('AM', 'كتلة هواء')],
      "ShortCircuitAr": ["sc", ArabicSymbols('sc', 'ق')],
      "PhotovoltaicEnergyAr": ["P", ArabicSymbols('P', 'ط')],
      "INAr": ["inn", ArabicSymbols('in', 'د')],
      "DiffusionLengthAr": ["Ld", ArabicSymbols('L_d', 'ل_ر')],
      "CurrentAr": ["current", ArabicSymbols('I', 'ت')],
      "VoltageAr": ["V", ArabicSymbols('V', 'جـ')],

      // omarDoesNotKnowIt
      "EKAr": ["ek", ArabicText('e', 'انتشار،ك')],
      "EspsilonRAr": ["er", ArabicTeX('\\epsilon{}r', '\\fliph{\\epsilon{}r}')],
      "CurrentDensityAr": ["J", ArabicSymbols('J', 'ك.ت')],
      "FillFactorAr": ["FF", ArabicSymbols('FF', 'ع.ت')],
      "OpenCircuitAr": ["oc", ArabicSymbols('oc', 'م')],
      "SpreadCoefficientAr": ["D", ArabicSymbols('D', 'م')],
      "RadiationAr": ["rad", ArabicSymbols('l', 'ع')],
      "TemratureAr": ["Tmpr", ArabicSymbols('T', 'د')],
      "ConcentrationReceiverAtomAr": ["NA", ArabicSymbols('NA', 'ن_ق')],
      "ConcentrationDonorAtomAr": ["ND", ArabicSymbols('ND', 'ن_م')],
      "ConcentrationCarierPureAr": ["nii", ArabicSymbols('ni', 'ن_ك')],
      "DeplationAreaWidthAr": ["Wd", ArabicSymbols('W', 'ل_ن')],
      "ElectronsMotionConstantAr": ["mue", ArabicTeX('\\mu{}e', '\\fliph{\\mu{}e}')],
      "DiffusionElectronsAr": ["diffe", ArabicSymbols('\\text{diff},e', 'ن\\ ك')]


      // Solar Energy Course Part #2
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
    };


    return {
      getDefinitions: function() {
        var definitions = {};

        Object.keys(macros).forEach(function(key) {
          var texCommand = macros[key][0];
          definitions[texCommand] = key;
        });

        return definitions;
      },
      getParsers: function() {
        var parsers = {};

        Object.keys(macros).forEach(function(key) {
          var parserFunction = macros[key][1];
          parsers[key] = parserFunction;
        });

        return parsers;
      },
      // TODO: Allow plugin users to add more units
      ArabicTeX: ArabicTeX,
      ArabicText: ArabicText,
      ArabicTextWithSpace: ArabicTextWithSpace,
      ArabicSymbols: ArabicSymbols
    };
  }());


  var HTML_CSS_JAX_ARABIC_SUPORT = function() {
    MathJax.Hub.Config({
      'HTML-CSS': {
        // TODO: Make the font configurable by user
        undefinedFamily: 'Amiri',
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
        }
      }
    });

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
  };


  var ARABIC_UNITS_TEX_JAX = function() { // MODULE
    MathJax.Hub.Register.StartupHook('TeX HTML Ready', function() {
      var TEX = MathJax.InputJax.TeX;
      var TEXDEF = TEX.Definitions;

      TEXDEF.Add({
        macros: ARABIC_UNITS_GENERATOR.getDefinitions()
      });


      TEX.Parse.Augment(ARABIC_UNITS_GENERATOR.getParsers());


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

      var texParseMMLToken = TEX.Parse.prototype.mmlToken;

      TEX.Parse.Augment({
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
          var parsedToken = texParseMMLToken.apply(this, [token]);

          if ('ar' === this.stack.env.lang) {
            if ('mn' === token.type) {
              return this.arabicNumber(parsedToken);
            } else if ('mi' === parsedToken.type) {
              return this.arabicIdentifier(parsedToken);
            } else if ('mo' === parsedToken.type) {
              return this.arabicOperator(parsedToken);
            }
          }

          return parsedToken;
        }
      });
    });
  };

  TEX_JAX_ARABIC_SUPPORT();
  HTML_CSS_JAX_ARABIC_SUPORT();
  ARABIC_UNITS_TEX_JAX();

  MathJax.Ajax.loadComplete("[Contrib]/arabic/unpacked/arabic.js");
}());
