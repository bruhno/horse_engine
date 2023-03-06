const {RandomArray} = require("../src/game")

test('array contains all elements', ()=>{
    var arr0 = ['a','b','c','d'];

    var arr = RandomArray(arr0);

    expect(arr).toContain('a');
    expect(arr).toContain('b');
    expect(arr).toContain('c');
    expect(arr).toContain('d');

    expect(arr.length).toBe(arr0.length);
    expect(arr[0]+arr[1]+arr[2]+arr[3]).not.toBe('abcd');
    expect(arr0[0]+arr0[1]+arr0[2]+arr0[3]).toBe('abcd');
});