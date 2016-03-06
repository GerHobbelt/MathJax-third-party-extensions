/*!
 * The MIT License
 *
 * Copyright (c) 2015-2016 The Queen Rania Foundation for Education and Development
 *
 * http://www.qrf.org
 * http://www.edraak.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

MathJax.Hub.Config({
  // Math variables and functions
  Arabic: {
    identifiersMap: {
      // Sets operations, and other stuff
      'A': 'أ',
      'B': 'ب',
      'C': 'جـ',

      // Variable name
      'a': 'أ',

      // Variable name
      // TODO: Consider using Arabic letter dotless beh 0x66e instead
      'b': 'ب',

      // Variable name.
      // Suffixed with Unicdoe Arabic tatweel 0x0640
      'c': 'حـ',

      // Mixed use (Function, variable and (dx))
      'd': 'د',

      // Mixed use. With Unicdoe Arabic tatweel 0x0640
      'e': 'هـ',

      // Variable name
      'n': 'ن',

      // Mixed use
      'm': 'م',
      'l': 'ل',

      // Function name
      // TODO: Consider using dotless qaf (ٯ) instead
      'f': 'ق',

      // Function name
      'g': 'د',

      // Mixed use
      'k': 'ك',

      // Mixed use
      'r': 'ر',
      't': 'ت',

      // Variable names
      'x': 'س',
      'y': 'ص',
      'z': 'ع'
    }
  }
});

MathJax.Hub.Config({
  'HTML-CSS': {
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
        'font-family': 'Amiri !important',
        'font-style': 'normal !important'
      }
    }
  }
});


MathJax.Hub.Register.StartupHook('mml Jax Ready', function () {
  MathJax.Hub.Register.StartupHook('HTML-CSS Jax Ready', function () {
    MathJax.Hub.Register.StartupHook('Arabic TeX Ready', function () {
      var MML = MathJax.ElementJax.mml;

      var flipHorizontalElement = function (token, element) {
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

      ['mi'].forEach(function (name) {
        var originalToHTML = MML[name].prototype.toHTML;

          MML[name].Augment({
          toHTML: function (span) {

            var element = originalToHTML.apply(this, [span]);

            if (Node.TEXT_NODE === element.firstChild.nodeType) {
              flipHorizontalElement(this, element);
            } else {
              flipHorizontalElement(this, element.firstChild);
            }

            return element;
          }
        });
      });

      ['mn', 'mo', 'mtext', 'msubsup', 'mrow', 'mfrac'].forEach(function (name) {
        var originalToHTML = MML[name].prototype.toHTML;

        MML[name].Augment({
          toHTML: function (span) {
            var element = originalToHTML.apply(this, [span]);
            flipHorizontalElement(this, element);
            return element;
          }
        });
      });
    });
  });
});






MathJax.Hub.Config({
  Arabic: {
    identifiersMap: {
      // Math functions
      'sin': 'جا',
      'cos': 'جتا',
      'tan': 'ظا',
      'log': 'لو'
    }
  }
});


MathJax.Hub.Config({
  Arabic: {
    // Limits
    operatorsMap: {
      'lim': 'نهــا'
    }
  }
});


MathJax.Hub.Register.StartupHook('Arabic TeX Startup', function () {
  var TeX = MathJax.Arabic.TeX;
  var Text = MathJax.Arabic.Text;

  MathJax.Hub.Config({
    Arabic: {
      dict: {
        // A macros to force English zero in both languages
        "Zero": ["zero", TeX('0', '\\text{0}')],  // Better localized Zero
        "Radius": ["radius", Text('r', 'نق')],  // Circle radius
        "Area": ["Area", Text('A', 'م')]  // Area of circles and other stuff
      }
    }
  });

  MathJax.Hub.Register.StartupHook('Arabic TeX Ready', function () {
    // By default, a lonely Zero is converted into `صفر`
    var TEX = MathJax.InputJax.TeX;
    var texParseArabicNumber = TEX.Parse.prototype.arabicNumber;

    TEX.Parse.Augment({
      arabicNumber: function (token) {
        var text = token.data[0].data[0];
        if ('0' === text) {
          text = 'صفر';

          token.data[0].data[0] = text;
          token = token.With({
            fontLang: 'ar'
          });

          return this.flipHorizontal(token);
        } else {
          return texParseArabicNumber.apply(this, [token]);
        }
      }
    });
  });
});

MathJax.Hub.Config({
  Arabic: {
    dict: {},
    isArabicPage: (document.documentElement.lang === 'ar'),
    identifiersMap: {},
    numbersMap: {
      '0': '٠',
      '1': '١',
      '2': '٢',
      '3': '٣',
      '4': '٤',
      '5': '٥',
      '6': '٦',
      '7': '٧',
      '8': '٨',
      '9': '٩'
    },
    operatorsMap: {
      // English to Arabic comma
      ',': '،'
    }
  }
});


MathJax.Arabic = {
  TeX: function (english, arabic) {
    // Creates a translated TeX macro.

    return function (name) {
      var TEX = MathJax.InputJax.TeX;

      var tex;
      if ('ar' === this.stack.env.lang) {
        tex = arabic;
      } else {
        tex = english;
      }

      this.Push(TEX.Parse(tex).mml());
    };
  },
  Text: function (english, arabicText) {
    // Creates a translated TeX macro, with an Arabic plain text.

    return MathJax.Arabic.TeX(english, '\\fliph{\\text{' + arabicText + '}}');
  },
  TextWithSpace: function (english, arabicText) {
    // Just like `Text` but adds one space before the Arabic text.

    var arabic = '\\ \\fliph{\\text{' + arabicText + '}}';

    return function (name) {
      var TEX = MathJax.InputJax.TeX;

      if ('ar' === this.stack.env.lang) {
        this.Push(TEX.Parse(arabic).mml());
      } else {
        this.Push(TEX.Parse(english).mml());
      }
    };
  },
  Symbols: function (english, arabicSymbols) {
    // Creates a translated TeX macro that converts Arabic symbols into text nodes,
    // and treats everything else as normal TeX.

    var arabicLanguageRegExp = /([\u0600-\u06FF]+)/g;

    var arabic = arabicSymbols.replace(arabicLanguageRegExp, '\\fliph{\\text{$1}}');

    return MathJax.Arabic.TeX(english, arabic);
  }
};


MathJax.Hub.Startup.signal.Post('Arabic TeX Startup');

MathJax.Hub.Register.StartupHook('Arabic TeX Startup', function () {
  MathJax.Hub.Register.StartupHook('TeX Jax Ready', function () {
    var TEX = MathJax.InputJax.TeX;
    var texParseMMLToken = TEX.Parse.prototype.mmlToken;
    var texParseAlignedArray = TEX.Parse.prototype.AlignedArray;
    var dict = MathJax.Hub.config.Arabic.dict;


    TEX.Definitions.Add({
      macros: {
        'ar': 'HandleArabic',
        'alwaysar': 'MarkAsArabic',
        'fliph': 'HandleFlipHorizontal'
      }
    });


    TEX.Definitions.Add({
      macros: function () {
        var definitions = {};

        Object.keys(dict).forEach(function (key) {
          var texCommand = dict[key][0];
          definitions[texCommand] = key;
        });

        return definitions;
      }()
    });


    TEX.Parse.Augment(function () {
      var parsers = {};

      Object.keys(dict).forEach(function (key) {
        parsers[key] = dict[key][1]; // Parser function
      });

      return parsers;
    }());


    TEX.Parse.Augment({
      flipHorizontal: function (token) {
        return token.With({
          // Invert the value, because flipping twice means, it is not flipped
          fliph: !token.Get('fliph')
        });
      },
      arabicNumber: function (token) {
        var numbersMap = MathJax.Hub.config.Arabic.numbersMap;
        var text = token.data[0].data[0];
        var mapped = text;

        Object.keys(numbersMap).forEach(function (arabicNumber) {
          var hindiNumber = numbersMap[arabicNumber];
          var regex = new RegExp('' + arabicNumber, 'g');
          mapped = mapped.replace(regex, hindiNumber);
        });

        if (mapped !== text) {
          token.data[0].data[0] = mapped;
          token = token.With({
            fontLang: 'ar'
          });
        }

        return this.flipHorizontal(token);
      },
      arabicIdentifier: function (token) {
        var identifiersMap = MathJax.Hub.config.Arabic.identifiersMap;
        var identifiersKeys = Object.keys(identifiersMap).sort(function (a, b) {
          return b.length - a.length;
        });

        token.data.forEach(function (elem) {
          elem.data.map(function (text) {
            var mapped = text;

            if ('chars' === elem.type) {
              // English Symbols like X and Y
              identifiersKeys.forEach(function (enChar) {
                var arChar = identifiersMap[enChar];
                var regex = new RegExp(enChar, 'g');
                mapped = mapped.replace(regex, arChar);
              });
            }

            if (mapped !== text) {
              token.With({
                fontLang: 'ar'
              });

              elem.With({
                fontLang: 'ar'
              })
            }

            return mapped;
          });
        });

        return this.flipHorizontal(token);
      },
      arabicOperator: function (token) {
        var operatorsMap = MathJax.Hub.config.Arabic.operatorsMap;
        var text = token.data[0].data[0];
        var mapped = text;

        Object.keys(operatorsMap).forEach(function (enOperator) {
          var regex = new RegExp('' + enOperator, 'g');
          var arOperator = operatorsMap[enOperator];
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
      _getArgumentMML: function (name) {
        //  returns an argument that is a single MathML element
        //  (in an mrow if necessary)
        //
        //  This functions has been copied here from extensions/TeX/HTML.js, to avoid
        //  adding a dependency.
        //
        //  TODO: Consider importing (as a dependency) this from HTML.js instead!
        var arg = this.ParseArg(name);
        if (arg.inferred && arg.data.length == 1)
          {arg = arg.data[0]} else {delete arg.inferred}
        return arg;
      },
      mmlToken: function (token) {
        // TODO: Check for possible incompatibility with boldsymbol extension
        var parsedToken = texParseMMLToken.apply(this, [token]);

        if ('ar' === this.stack.env.lang) {
          this.makeItArabic(parsedToken);
        }

        return parsedToken;
      },
      makeItArabic: function (token) {
        if ('mn' === token.type) {
          return this.arabicNumber(token);
        } else if ('mi' === token.type) {
          return this.arabicIdentifier(token);
        } else if ('mo' === token.type) {
          return this.arabicOperator(token);
        }
      },
      AlignedArray: function () {
        var array = texParseAlignedArray.apply(this, arguments);
        var _this = this;

        var arrayEndTable = array.EndTable;
        array.EndTable = function () {
          var retVal = arrayEndTable.apply(this, arguments);

          // Slice, to skip the first row, because
          // It is always Arabic, not sure why!
          array.table.slice(1).forEach(function (token) {
            var rowTokens = token.data[0].data[0].data;

            rowTokens.map(_this.makeItArabic, _this);
          });

          return retVal;
        };

        return array;
      },
      HandleArabic: function (name) {
        if (MathJax.Hub.config.Arabic.isArabicPage) {
          this.MarkAsArabic(name);
        }
      },
      MarkAsArabic: function (name) {
        this.stack.env.lang = 'ar';

        var arg = this._getArgumentMML(name);

        this.Push(this.flipHorizontal(arg).With({
          lang: 'ar'
        }));
      },
      HandleFlipHorizontal: function (name) {
        var arg = this._getArgumentMML(name);
        this.Push(this.flipHorizontal(arg));
      }
    });

    MathJax.Hub.Startup.signal.Post('Arabic TeX Ready');
  });
});

// This file starting with the letter `z` to make sure it gets concatenated last!
MathJax.Ajax.loadComplete("[Contrib]/arabic/arabic.js");
