
console.log("==== Arrays ====");
// exercise 1
{
    const sort = arr => arr.sort((a, b) => b - a);
    console.log("exercise 1: ", sort([1, 2, 3, 7, 8, 9, 3, 4, 5]));
}

// exercise 2
{
    const andArray = (arr1, arr2) => {
        const arr3 = [];

        for (let i = 0; i < arr1.length; i++) {
            outer: for (let j = 0; j < arr2.length; j++) {
                //try push
                if (arr1[i] === arr2[j]) {
                    for (let k = 0; k < arr3.length; k++) {
                        if (arr3[k] === arr1[i]) {
                            break outer;
                        }
                    }

                    arr3.push(arr1[i]);
                }
            }
        }

        return arr3;
    }

    console.log("exercise 2: ", andArray([1, 2, 1, 2, 1], [2, 2, 2, 1, 3, 1, 2]));
}

// exercise 3
{
    const sumMat = mat => mat.reduce((acc, item) => (item instanceof Array ? sumMat(item) : item) + acc, 0);
    console.log("exercise 3: ", sumMat([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]));
}

// exercise 4
{
    const popNum = (arr, num) => {
        const stack = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === num) {
                while (arr.length != i)
                    stack.push(arr.pop());

                stack.pop();

                while (stack.length > 0)
                    arr.push(stack.pop())
            }
        }

        return arr;
    }

    console.log("exercise 4: ", popNum([1, 2, 3, 4, 5, 1, 2, 34, 5, 1, 2, 3, 1, 2], 1));
}

console.log("==== Arrow functions ====");
// exercise 1
{
    const lengthBiggerThen5 = str => str.length > 5;
    console.log("exercise 1: ", lengthBiggerThen5("hello seaman"));
}

// exercise 2
{
    const firstAndLastCharcterEqual = str => str[0] === str[str.length - 1];
    console.log("exercise 2: ", firstAndLastCharcterEqual("abcba"));
}

// exercise 3
{
    const lastCharacterIsUppercase = str => str[str.length - 1] === str[str.length - 1].toUpperCase();
    console.log("exercise 3: ", lastCharacterIsUppercase("abcdrtf"));
}

console.log("==== Map/forEach ====");

// exercise 1
{
    const divisibleBy3 = arr => arr.map(item => item % 3)
                                   .map((item, idx) => item === 0 ? console.log(`num: ${arr[idx]}, idx: ${idx}`) | item : item)
                                   .reduce((acc, item) => (item === 0 ? 1 : 0) + acc, 0) ===  0 ? console.log("array not divided by 3") : undefined;

    console.log("exercise 1: ");
    divisibleBy3([18, 15, 3 , 8, 2, 4 ,6 ,10, 12]);
    divisibleBy3([1, 2, 4, 5, 7, 8, 11, 13, 14]);
}

// exercise 2
{
    const mapUpperLower = arr => arr.map(char => char === char.toUpperCase() ? "U" : "L");
    console.log("exercise 2: ", mapUpperLower("AbCdEfG".split("")));
}

// exercise 3
{
    const weirdMap = arr => arr.map((char, idx) => idx % 2 === 0 ? idx : char);
    console.log("exercise 3: ", weirdMap("abcdef".split("")));
}

// exercise 4
{
    const agesBiggerEqualsTo18 = ages => ages.filter(age => age >= 18);
    console.log("exercise 4: ", agesBiggerEqualsTo18([11, 18, 17, 19, 21, 26, 41, 35, 23, 9 ,0, -1, 18.5]));
}

// exercise 5
{
    const removeIndex3 = arr => arr.filter((_, index) => index !== 3);
    console.log("exercise 5: ", removeIndex3([0,1,2,3,4,5,6,7]));
}

// exercise 6
{
    let arrNames = ["Daniel", "Eitan", "Sivan", "Matan"];

    const addNameToArr = firstname => arrNames = [...arrNames, firstname];

    console.log("exercise 6: ", addNameToArr("Artiom"));
}

// exercise 7
{
    const concat = (arr1, arr2) => [...arr1, ...arr2];
    console.log("exercise 7: ", concat(["Daniel", "Smulik"], ["Yonatan"]));
}