const assert = require("node:assert/strict");
const ChaiCSS = require("../src/chai");

function test(name, callback) {
  try {
    callback();
    console.log("PASS", name);
  } catch (error) {
    console.error("FAIL", name);
    throw error;
  }
}

test("parses padding utilities", () => {
  assert.deepEqual(ChaiCSS.parseUtility("chai-p-2"), { padding: "2px" });
  assert.deepEqual(ChaiCSS.parseUtility("chai-px-12"), {
    paddingLeft: "12px",
    paddingRight: "12px"
  });
});

test("parses margin utilities", () => {
  assert.deepEqual(ChaiCSS.parseUtility("chai-mt-8"), { marginTop: "8px" });
  assert.deepEqual(ChaiCSS.parseUtility("chai-my-10"), {
    marginTop: "10px",
    marginBottom: "10px"
  });
});

test("parses color utilities", () => {
  assert.deepEqual(ChaiCSS.parseUtility("chai-bg-red"), { backgroundColor: "#ef4444" });
  assert.deepEqual(ChaiCSS.parseUtility("chai-text-0f172a"), { color: "#0f172a" });
  assert.deepEqual(ChaiCSS.parseUtility("chai-bg-[linear-gradient(135deg,_red,_blue)]"), {
    backgroundColor: "linear-gradient(135deg, red, blue)"
  });
});

test("parses typography utilities", () => {
  assert.deepEqual(ChaiCSS.parseUtility("chai-text-center"), { textAlign: "center" });
  assert.deepEqual(ChaiCSS.parseUtility("chai-text-xl"), { fontSize: "20px" });
  assert.deepEqual(ChaiCSS.parseUtility("chai-font-bold"), { fontWeight: "700" });
  assert.deepEqual(ChaiCSS.parseUtility("chai-leading-1.6"), { lineHeight: "1.6" });
});

test("parses layout utilities", () => {
  assert.deepEqual(ChaiCSS.parseUtility("chai-flex"), { display: "flex" });
  assert.deepEqual(ChaiCSS.parseUtility("chai-flex-col"), { flexDirection: "column" });
  assert.deepEqual(ChaiCSS.parseUtility("chai-items-center"), { alignItems: "center" });
  assert.deepEqual(ChaiCSS.parseUtility("chai-justify-between"), { justifyContent: "space-between" });
});

test("parses border, radius, and sizing utilities", () => {
  assert.deepEqual(ChaiCSS.parseUtility("chai-border"), {
    borderWidth: "1px",
    borderStyle: "solid"
  });
  assert.deepEqual(ChaiCSS.parseUtility("chai-border-blue"), { borderColor: "#3b82f6" });
  assert.deepEqual(ChaiCSS.parseUtility("chai-rounded-lg"), { borderRadius: "10px" });
  assert.deepEqual(ChaiCSS.parseUtility("chai-w-120"), { width: "120px" });
});

test("ignores non-chai classes and unknown utilities", () => {
  assert.equal(ChaiCSS.parseUtility("p-2"), null);
  assert.equal(ChaiCSS.parseUtility("chai-shadow-soft"), null);
});
