testGroup("Shall Succeed", () => {

  test("initial state: expanded", () =>
  {
    $expect("section.collapsible").state("collapsed").off();
  });

  test("click, toggle test", async () =>
  {
    let section = $expect("section.collapsible");
      
    section.$("caption").click();

    await delay(400);

    section.state("collapsed").on();

    section.$("caption").click();

    await delay(400);

    section.state("collapsed").off();

  });

});

testGroup("Shall Fail", () => {

  test("intentially fails", () =>
  {
    $expect("section.collapsible").state("collapsed").on();
  });

});
