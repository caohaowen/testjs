(function(d) {
  var g = IN.ENV.widget,
      c = "type",
      k = "content",
      h = "app-name",
      f = "signal",
      e = "=",
      b = "sf-";
  var a = {
    member: {
      params: {},
      url: g.sfdc_member_url,
      method: "GET"
    },
    company: {
      params: {},
      url: g.sfdc_company_url,
      method: "GET"
    },
    signal: {
      params: {},
      url: g.sfdc_signal_url,
      method: "POST"
    }
  };

  function i(n) {
    var l = n[h],
        m = a[l];
    if (l !== f) {
      for (var o in n) {
        if (n.hasOwnProperty(o) && o.indexOf(b) !== 0) {
          m.params[o] = n[o]
        }
      }
    } else {
      m.params = n
    }
    m.params.api_key = IN.ENV.auth.api_key;
    delete m.params.content;
    delete m.params.type;
    return m
  }
  IN.$extensions("SFDC", function j() {
    Sslac.Class("IN.Tags.SFDC").Extends("IN.Tags.Base").Constructor(function(m, l) {
      this.Parent(m, l);
      window.onload = function() {
        var n = document.createElement("style");
        n.innerHTML = "body.contactTab { margin: 0; }";
        document.body.appendChild(n)
      };
      this.createFrame(l)
    }).Method("createFrame", function(l) {
      if (!IN.ENV.auth.api_key) {
        throw new Error("A valid API key must be provided for viewing this SalesForce extension.")
      }
      var m = i(l);
      this.el().innerHTML = "";
      this.win = new IN.Objects.SmartWindow({
        mode: "embedded",
        url: m.url,
        method: m.method
      });
      delete l.content;
      delete l.type;
      this.win.params(l);
      this.win.success(function(n) {
        var o = d.SFDC[n.fnName];
        if (o) {
          o(n.payload)
        }
      });
      this.win.params(m.params);
      this.win.place(this.el())
    });
    IN.addTag("SFDC", IN.Tags.SFDC)
  })
})(this);