test("initial state: expanded", () =>
{
  $expect("section.collapsible").state("collapsed").off();
});

test("click, toggle test", async () =>
{
  let section = $expect("section.collapsible");
    
  section.$("caption").click();

  await delay(400);

  section.state("expanded").off();

  section.$("caption").click();

  await delay(400);

  section.state("expanded").on();

});

