type Operation= 'multiply'|'add'|'divide'

const multiplicator = (a:number, b:number, op:Operation) => {
    if (op === 'multiply') {
        return a * b;
      } else if (op === 'add') {
        return a + b;
      } else if (op === 'divide') {
        if (b === 0) return 'can\'t divide by 0!';
        return a / b;
      }
  }
  
  multiplicator(2, 3, 'add');