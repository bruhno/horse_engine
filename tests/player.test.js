const {Player}=require("../src/player")

test("new player",()=>{
    var p = new Player("ABC");

    expect(p.origin).toBe("ABC")
})