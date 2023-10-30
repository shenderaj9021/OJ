// Function to compare the output with the expected output
function compareOutputs(output, expectedOutput) {
  console.group("output trim ",output.trim()," expected output ",expectedOutput.trim());
  console.log("Enterd into campare output function ")
    if (output.trim() === expectedOutput.trim()) {
      return 'Accepted'; // Return the result as 'Accepted' if outputs match
    } else {
      return 'Wrong Answer'; // Return the result as 'Wrong Answer' if outputs don't match
    }
  }
  
module.exports = compareOutputs;
  