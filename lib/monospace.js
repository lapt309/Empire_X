function monospace(input) {
    const boldz = {
        'A': '𝗮', 'B': '𝗯', 'C': '𝗰', 'D': '𝗱', 'E': '𝗲', 'F': '𝗳', 'G': '𝗴',
        'H': '𝗵', 'I': '𝗶', 'J': '𝗷', 'K': '𝗸', 'L': '𝗹', 'M': '𝗺', 'N': '𝗻',
        'O': '𝗼', 'P': '𝗽', 'Q': '𝗾', 'R': '𝗿', 'S': '𝘀', 'T': '𝘁', 'U': '𝘂',
        'V': '𝘃', 'W': '𝘄', 'X': '𝘅', 'Y': '𝘆', 'Z': '𝘇',
        '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲',
        '7': '𝟳', '8': '𝟴', '9': '𝟵',
        ' ': ' ' 
    };
    return input.split('').map(char => boldz[char] || char).join('');
}

module.exports = { monospace };  // Ensure this line is included