
function getById(id) {
    return document.getElementById(id);
}

// exercise 1
{
    function isNumber(char) {
        return char >= "0" && char <= "9";
    }

    function checkValidIDNumber(id) {
        if (id.length !== 9) return false;

        for (let i = 0; i < 9; i++) {
            if (!isNumber(id[i])) return false;
        }

        return true;
    }
}

// exercise 2
{
    function isPrimeNumber(number) {
        for (let i = 2; i < number - 1; i++) {
            if (number % i === 0) return false;
        }

        return true;
    }

    console.log("exercise 2 - is prime:", "11", isPrimeNumber(11), "12", isPrimeNumber(12), "13", isPrimeNumber(13));
}

// exercise 3
{
    function isCapitalLetter(char) {
        return char >= "A" && char <= "Z";
    }

    function putSpaceBeforeCapitalLetter(string) {
        let newString = "";

        for (let i = 0; i < string.length; i++) {
            if (isCapitalLetter(string[i])) {
                newString += " ";
            }

            newString += string[i];
        }

        return newString;
    }

    console.log("exercise 3: ", "adCdEf -> ", putSpaceBeforeCapitalLetter("adCdEf"));
}

// exercise 4
{

    function countSmallStringInstancesInLongString(strLong, strShort) {
        if (strLong.length < strShort.length) {
            let temp = strLong;
            strLong = strShort;
            strShort = temp;
        }

        let endI = strLong.length - strShort.length;

        let count = 0;

        outerLoop:
        for (let startI = 0; startI <= endI; startI++) {

            for (let i = 0; i < strShort.length; i++) {

                if (strLong[i + startI] != strShort[i]) continue outerLoop;
            }

            count++;
        }

        return count;
    }

    console.log("exercise 4: ",
        "(ab, ababbababa) ->", countSmallStringInstancesInLongString("ab", "ababbababa"),
        "(ttyt, ttyttyttyttytt) ->", countSmallStringInstancesInLongString("ttyt", "ttyttyttyttytt"));

}

// exercise 5
{
    let arr = "abc"

    function swap(arr, i1, i2) {
        let temp = arr[i1];
        arr[i1] = arr[i2];
        arr[i2] = temp;
    }

    function quickSortInner(arr, left, right) {
        //debugger;

        if (left >= right) return;

        if (left + 1 === right) {
            if (arr[left] > arr[right]) {
                swap(arr, left, right);
            }

            return;
        }

        let pivot = Math.floor(left + (right - left) / 2);
        let pivotValue = arr[pivot];

        swap(arr, pivot, right);
        let last = right;

        let leftWalk = left;
        let rightWalk = right - 1;

        while (true) {
            while (arr[leftWalk] < pivotValue) {
                leftWalk++;
            }

            while (arr[rightWalk] > pivotValue) {
                rightWalk--;
            }

            if (leftWalk > rightWalk) {
                break;
            }

            swap(arr, leftWalk, rightWalk);
            leftWalk++;
            rightWalk--;
        }

        swap(arr, leftWalk, last);

        quickSortInner(arr, left, leftWalk - 1);
        quickSortInner(arr, leftWalk + 1, right);
    }

    function quickSort(arr) {
        //debugger;
        quickSortInner(arr, 0, arr.length - 1)
        return arr;
    }

    function sortCharacters(string) {
        return quickSort(string.split("")).join("");
    }

    const sortredStr = "abcdefghijklmnopqrstuvwxyz";
    const strToSort = sortredStr.split("").reverse().join("");

    console.log("exercise 5: fcab ->", sortCharacters("fcab"), ",", strToSort + " ->", sortCharacters(strToSort), sortredStr === sortCharacters(strToSort));
}

// exercise 6
{

    const TYPE_OPERATOR = "operator";
    const TYPE_NUMBER = "number";
    let nextInputClear = false;

    function addTextToCalc(text) {
        if (nextInputClear) {
            nextInputClear = false;
            getById("calc_output").innerHTML = "";
        }

        getById("calc_output").innerHTML += text;
    }

    function buildTokens(text) {
        let tokens = [];

        for (let i = 0; i < text.length; i++) {

            // trying to parse number
            if (isNumber(text[i])) {
                let num = "";

                while (i < text.length && isNumber(text[i])) {
                    num += text[i];
                    i++;
                }

                tokens.push({
                    type: TYPE_NUMBER,
                    value: parseInt(num)
                });

                i--;
                continue;
            }

            tokens.push({
                type: TYPE_OPERATOR,
                value: text[i]
            });
        }

        return tokens;
    }

    // return positive number if first operator comes first,
    //        negative number if first operator comes last,
    //        0 if equals

    const opsValues = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    }

    function compareOperator(op1, op2) {
        return opsValues[op1] - opsValues[op2];
    }

    function buildAst(tokens) {

        let root = { token: tokens[0] };
        let last = root;

        for (let i = 1; i < tokens.length; i++) {

            let newNode = { token: tokens[i] }

            if (tokens[i].type === TYPE_OPERATOR) {

                if (last.token.type === TYPE_OPERATOR) {
                    last.right = newNode;
                }
                else if (last.parent) {
                    // checking operator order operation
                    let res = compareOperator(tokens[i].value, last.parent.token.value);

                    if (res > 0) {
                        // connect to parent
                        newNode.parent = last.parent;
                        newNode.parent.right = newNode;

                        // connect prev node
                        last.parent = newNode;
                        newNode.left = last;
                    }
                    else {

                        let newNodeLeft = last.parent;

                        while (newNodeLeft.parent !== undefined && compareOperator(newNodeLeft.token.value, tokens[i].value) > 0) {
                            newNodeLeft = newNodeLeft.parent;
                        }

                        newNode.left = newNodeLeft;

                        if (newNodeLeft === root) {
                            root = newNode;
                        }
                    }
                } else {
                    last.parent = newNode;
                    newNode.left = last;

                    if (last === root) {
                        root = newNode;
                    }
                }

            }
            else // only number tokens here 
            {
                last.right = newNode;
                newNode.parent = last;
            }

            last = newNode;
        }

        return root;
    }

    const opsBinaryFuncs = {
        '+': (op1, op2) => op1 + op2,
        '-': (op1, op2) => op1 - op2,
        '*': (op1, op2) => op1 * op2,
        '/': (op1, op2) => {
            if (op2 === 0) throw new Error("can't divide by 0");
            return op1 / op2;
        },
    }

    const opsUnaryFuncs = {
        '+': op => op,
        '-': op => -op,
        '*': op => { throw new Error("no unary operator defined for * ") },
        '/': op => { throw new Error("no unary operator defined for / ") },
    }

    function evalAst(node) {
        if (node.token.type === TYPE_NUMBER) {
            return node.token.value;
        }
        else {
            if (node.left) {
                return opsBinaryFuncs[node.token.value](evalAst(node.left), evalAst(node.right));
            } else {
                return opsUnaryFuncs[node.token.value](evalAst(node.right));
            }
        }
    }

    function calculate() {
        let tokens = buildTokens(getById("calc_output").innerHTML);

        try {
            let ast = buildAst(tokens); 
            let result = evalAst(ast);
            getById("calc_output").innerHTML = result;
        } catch (err) {
            nextInputClear = true;
            getById("calc_output").innerHTML = err;
        }
    }
}