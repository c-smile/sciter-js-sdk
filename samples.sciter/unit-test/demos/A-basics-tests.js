
test("Plus function", () => 
{
  expect(plus(1,2)).equal(3);  
  expect(plus(2,2)).equal(4);
});

test("Plus function (must fail)", () =>
{
  expect(plus(2,3)).equal(4);
});
