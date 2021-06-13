function getInputValue(){
    // Selecting the input element and get its value 
    let inputVal = document.getElementById("myInput").value;
    const code_out = enigma_encoder(inputVal,generate_key());
    document.getElementById("encoded").innerHTML = code_out;
}

const alphabet = ['a','b','c','d','e','f','g','h','i','j','k',
'l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const Alphabet = ['A','B','C','D','E','F','G','H','I','J','K',
'L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function generate_key() {
    let alpha_out = [];
    let exit_index;
    let exit_letter;

    for (let i = 0; i < alphabet.length; i++) {
        
        do {
            exit_index = Math.floor(Math.random() * 26);
            exit_letter = alphabet[exit_index];
            if (alpha_out.length === alphabet.length - 1 && alpha_out.includes(exit_letter)) {return generate_key()};
        } while (alphabet[i] === exit_letter || alpha_out.includes(exit_letter));

        alpha_out.push(exit_letter);
    }
    return alpha_out;
};

function enigma_encoder(message,key) {
    let encoded_message = '';

    for (let i = 0; i < message.length; i++) {
        
        if (key.includes(message[i])) {

            let original_index = alphabet.indexOf(message[i]);

            encoded_message += key[original_index];
        } else if (Alphabet.includes(message[i])) {

            let original_index = Alphabet.indexOf(message[i]);

            encoded_message += Alphabet[alphabet.indexOf(key[original_index])];
        }
        else {
            encoded_message += message[i];
        }
    }

    return encoded_message;
}; 
