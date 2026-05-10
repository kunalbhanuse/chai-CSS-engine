(function (global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
  } else {
    global.ChaiCSS = factory();
  }
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  var PREFIX = "chai-";

  var namedColors = {
    black: "#111827",
    white: "#ffffff",
    transparent: "transparent",
    red: "#ef4444",
    orange: "#f97316",
    amber: "#f59e0b",
    yellow: "#eab308",
    green: "#22c55e",
    emerald: "#10b981",
    teal: "#14b8a6",
    cyan: "#06b6d4",
    blue: "#3b82f6",
    indigo: "#6366f1",
    violet: "#8b5cf6",
    purple: "#a855f7",
    pink: "#ec4899",
    rose: "#f43f5e",
    gray: "#6b7280",
    slate: "#475569",
    zinc: "#71717a"
  };

  var namedFontSizes = {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px"
  };

  var displayValues = {
    block: "block",
    inline: "inline",
    "inline-block": "inline-block",
    flex: "flex",
    grid: "grid",
    hidden: "none"
  };

  var directionValues = {
    row: "row",
    col: "column",
    "row-reverse": "row-reverse",
    "col-reverse": "column-reverse"
  };

  var alignValues = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
    baseline: "baseline"
  };

  var justifyValues = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly"
  };

  var radiusValues = {
    none: "0",
    sm: "2px",
    md: "6px",
    lg: "10px",
    xl: "14px",
    full: "9999px"
  };

  var borderWidths = {
    border: "1px",
    "border-0": "0",
    "border-2": "2px",
    "border-4": "4px",
    "border-8": "8px"
  };

  function isChaiClass(className) {
    return typeof className === "string" && className.indexOf(PREFIX) === 0;
  }

  function toPx(value) {
    if (value === undefined || value === "") {
      return null;
    }

    if (/^-?\d+(\.\d+)?$/.test(value)) {
      return value + "px";
    }

    return value;
  }

  function resolveColor(value) {
    if (!value) {
      return null;
    }

    if (namedColors[value]) {
      return namedColors[value];
    }

    if (/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(value)) {
      return "#" + value;
    }

    if (value.indexOf("[") === 0 && value.lastIndexOf("]") === value.length - 1) {
      return value.slice(1, -1).replace(/_/g, " ");
    }

    return value;
  }

  function setSpacing(styles, properties, value) {
    var resolved = toPx(value);
    if (!resolved) {
      return false;
    }

    properties.forEach(function (property) {
      styles[property] = resolved;
    });

    return true;
  }

  function parseUtility(className) {
    if (!isChaiClass(className)) {
      return null;
    }

    var utility = className.slice(PREFIX.length);
    var styles = {};
    var match;

    if ((match = utility.match(/^p([trblxy]?)-(.+)$/))) {
      var paddingMap = {
        "": ["padding"],
        t: ["paddingTop"],
        r: ["paddingRight"],
        b: ["paddingBottom"],
        l: ["paddingLeft"],
        x: ["paddingLeft", "paddingRight"],
        y: ["paddingTop", "paddingBottom"]
      };

      return setSpacing(styles, paddingMap[match[1]], match[2]) ? styles : null;
    }

    if ((match = utility.match(/^m([trblxy]?)-(.+)$/))) {
      var marginMap = {
        "": ["margin"],
        t: ["marginTop"],
        r: ["marginRight"],
        b: ["marginBottom"],
        l: ["marginLeft"],
        x: ["marginLeft", "marginRight"],
        y: ["marginTop", "marginBottom"]
      };

      return setSpacing(styles, marginMap[match[1]], match[2]) ? styles : null;
    }

    if ((match = utility.match(/^gap-(.+)$/))) {
      return setSpacing(styles, ["gap"], match[1]) ? styles : null;
    }

    if ((match = utility.match(/^bg-(.+)$/))) {
      styles.backgroundColor = resolveColor(match[1]);
      return styles;
    }

    if ((match = utility.match(/^text-(left|center|right|justify)$/))) {
      styles.textAlign = match[1];
      return styles;
    }

    if ((match = utility.match(/^text-(.+)$/))) {
      var textValue = match[1];
      styles.color = namedFontSizes[textValue] ? undefined : resolveColor(textValue);
      if (namedFontSizes[textValue] || /^-?\d+(\.\d+)?$/.test(textValue)) {
        styles = { fontSize: namedFontSizes[textValue] || toPx(textValue) };
      }
      return removeUndefined(styles);
    }

    if ((match = utility.match(/^font-(normal|medium|semibold|bold|black)$/))) {
      var weights = {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900"
      };

      styles.fontWeight = weights[match[1]];
      return styles;
    }

    if ((match = utility.match(/^leading-(.+)$/))) {
      styles.lineHeight = /^\d+(\.\d+)?$/.test(match[1]) ? match[1] : toPx(match[1]);
      return styles;
    }

    if (displayValues[utility]) {
      styles.display = displayValues[utility];
      return styles;
    }

    if ((match = utility.match(/^flex-(.+)$/)) && directionValues[match[1]]) {
      styles.flexDirection = directionValues[match[1]];
      return styles;
    }

    if ((match = utility.match(/^items-(.+)$/)) && alignValues[match[1]]) {
      styles.alignItems = alignValues[match[1]];
      return styles;
    }

    if ((match = utility.match(/^justify-(.+)$/)) && justifyValues[match[1]]) {
      styles.justifyContent = justifyValues[match[1]];
      return styles;
    }

    if (utility === "wrap") {
      styles.flexWrap = "wrap";
      return styles;
    }

    if (utility === "nowrap") {
      styles.flexWrap = "nowrap";
      return styles;
    }

    if (borderWidths[utility]) {
      styles.borderWidth = borderWidths[utility];
      styles.borderStyle = "solid";
      return styles;
    }

    if ((match = utility.match(/^border-(.+)$/))) {
      styles.borderColor = resolveColor(match[1]);
      return styles;
    }

    if ((match = utility.match(/^rounded(?:-(.+))?$/))) {
      styles.borderRadius = radiusValues[match[1] || "md"] || toPx(match[1]);
      return styles;
    }

    if ((match = utility.match(/^w-(.+)$/))) {
      return setSpacing(styles, ["width"], match[1]) ? styles : null;
    }

    if ((match = utility.match(/^h-(.+)$/))) {
      return setSpacing(styles, ["height"], match[1]) ? styles : null;
    }

    if ((match = utility.match(/^max-w-(.+)$/))) {
      return setSpacing(styles, ["maxWidth"], match[1]) ? styles : null;
    }

    if ((match = utility.match(/^min-h-(.+)$/))) {
      return setSpacing(styles, ["minHeight"], match[1]) ? styles : null;
    }

    return null;
  }

  function removeUndefined(styles) {
    Object.keys(styles).forEach(function (property) {
      if (styles[property] === undefined || styles[property] === null) {
        delete styles[property];
      }
    });

    return Object.keys(styles).length ? styles : null;
  }

  function applyStyles(element, styles) {
    Object.keys(styles).forEach(function (property) {
      element.style[property] = styles[property];
    });
  }

  function processElement(element, options) {
    var classNames = Array.prototype.slice.call(element.classList || []);
    var applied = [];

    classNames.forEach(function (className) {
      var styles = parseUtility(className);
      if (!styles) {
        return;
      }

      applyStyles(element, styles);
      applied.push(className);
    });

    if (options.removeClasses) {
      applied.forEach(function (className) {
        element.classList.remove(className);
      });
    }

    return applied;
  }

  function scan(root, options) {
    var settings = Object.assign({ removeClasses: true }, options || {});
    var scope = root || document;
    var candidates = [];
    var processed = [];

    if (scope.nodeType === 1) {
      candidates.push(scope);
    }

    Array.prototype.push.apply(candidates, scope.querySelectorAll("[class*='chai-']"));

    candidates.forEach(function (element) {
      var applied = processElement(element, settings);
      if (applied.length) {
        processed.push({ element: element, classes: applied });
      }
    });

    return processed;
  }

  function observe(root, options) {
    var scope = root || document.body;
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          processElement(mutation.target, Object.assign({ removeClasses: true }, options || {}));
        }

        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            scan(node, options);
          }
        });
      });
    });

    observer.observe(scope, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class"]
    });

    return observer;
  }

  function ready(callback) {
    if (typeof document === "undefined") {
      return;
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  ready(function () {
    scan(document);
  });

  return {
    PREFIX: PREFIX,
    colors: namedColors,
    parseUtility: parseUtility,
    processElement: processElement,
    scan: scan,
    observe: observe
  };
});
