type Operation= 'multiply'|'add'|'divide'
type Result = string|number

const multiplicator = (a:number, b:number, op:Operation):Result => {
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