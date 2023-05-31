// 1
{
    let a = 1;
    let b = 2;
    let c = 3;

    console.log("exercise 1:", a * b * c);
}

// 2
{
    let a = "AA";
    let b = "BB";
    let c;
    c = a;
    a = b;
    b = c;

    console.log("exercise 2:", a, b);
}

// 3
{
    let name = "Daniel Riz";
    console.log("exercise 3:", name.replace(" ", "*"));
}

// 4
{
    let a = 2;
    let b = 5;
    console.log("exercise 4:", a**b);
}

// 5
{
    let char = "a";
    let string = "ABCDEF";
    
    let midIdx = Math.floor(string.length / 2);
    let fullString = char + string.slice(0, midIdx) + char + string.slice(midIdx) + char;
    console.log("exercise 5:", fullString);
}

// 6
{
    let a = 10;
    let b = 2;
    let c = 3
    let d = 4;
    let e = 5;

    console.log("exerise 6a:", a * b * c * d * e);
    console.log("exerise 6b:", a % 10 + b % 10 + c % 10 + d % 10 + e % 10);
}

// 7
{
    let stringA = "a b";
    let stringB = "c d";
    console.log("exerise 7:", (stringA + " " + stringB).length);
}

// 8
{
    let fullName = "Daniel Riz";
    console.log("exerise 8:", 
    "length of name: " + fullName.substring(0, fullName.indexOf(" ")).length,
    "length of last name: " + fullName.substring(fullName.indexOf(" ") + 1).length)
}

// extra **
{
    // this will not work qith very small or very large numbers
    // because limited bit count.
    // for example if we think of an number type as byte for now,
    // if we take a = 255 and b = 255 there will be an 
    // overflow and the data will be lost.
    // same goes for javascript but it takes a larger number
    // because number data type is a 64 float number.
    
    let a = Math.floor(Math.random() * 1000);
    let b = Math.floor(Math.random() * 1000);

    console.log("**extra before: ", a , b);
    
    b *= a; // a = 10, b = 60
    a = b / a; // a = 6, b = 60
    b = b / a; // a = 6, b = 10
    
    console.log("**extra after: ", a , b);
}