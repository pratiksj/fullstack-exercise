type Operation= 'multiply'|'add'|'divide'

const multiplicator = (a:number, b:number, op:Operation):number|string => {
    if (op === 'multiply') {
        return a * b;
      } else if (op === 'add') {
        return a + b;
      } else if (op === 'divide') {
        if (b === 0) return 'this cannot be done';
        return a / b;
      }
  }
  
  multiplicator(2, 3, 'add');