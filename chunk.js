const { Readable } = require('stream');

const peaks = [
  'Tallac',
  'Ralston',
  'Robserson',
  'Twin Peaks',
  'Mt. Baker',
  'Mt. Harvard',
  'Mt. Yale',
  'Mt. Shasta',
];

class StreamFromArray extends Readable {
  constructor(array) {
    super(); 
    this.array = array;
    this.index = 0;
  }

  _read() {
    if (this.index <= this.array.length) {
      const chunk = this.array[this.index];
      this.push(chunk);
      this.index++;
    } else {
      this.push(null);
    }
  }
}

const peakstream = new StreamFromArray(peaks);

peakstream.on('data', (chunk) => console.log('chunk',chunk));

peakstream.on('end', () => console.log('done'))


