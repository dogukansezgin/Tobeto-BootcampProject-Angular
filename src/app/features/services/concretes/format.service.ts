import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormatService {

    constructor() { }

    formatBootcampDetailRoute(name: string): string {
        const turkishCharacters: { [key: string]: string } = {
            'ğ': 'g',
            'Ğ': 'g',
            'ü': 'u',
            'Ü': 'u',
            'ş': 's',
            'Ş': 's',
            'ı': 'i',
            'İ': 'i',
            'ö': 'o',
            'Ö': 'o',
            'ç': 'c',
            'Ç': 'c'
        };

        // Türkçe karakterleri düzeltme işlemi
        name = name.replace(/./g, (char) => turkishCharacters[char] || char);

        // Parantez içindeki ifadeleri işleme alma işlemi
        name = name.replace(/\((.*?)\)/g, (match, group1) => {
            // Parantez içindeki ifadeyi bölme işlemi
            const parts = group1.split('+');

            // Her parçayı kontrol etme işlemi
            parts.forEach((part: string, index: number) => {

                // .NET ve C# kontrolü
                if (part.includes('.NET')) {
                    parts[index] = 'dotnet';
                } else if (part.includes('C#')) {
                    parts[index] = 'csharp';
                }
            });
            // Parçaları birleştirme işlemi
            return 'p ' + parts.join('');
        });

        // Küçük harfe dönüştürme ve boşlukları tirelerle değiştirme işlemi
        name = name.toLowerCase();
        name = name.replace(/\s+/g, '-');

        // Sonunda kalan gereksiz tirelerin silinmesi
        name = name.replace(/-+/g, '-');

        // Eğer isim '-' ile bitiyorsa sondaki '-' karakterinin silinmesi
        if (name.endsWith('-')) {
            name = name.slice(0, -1);
        }

        return name;
    }

    convertUrlToName(urlText: string): string {
        // Tireleri boşluklarla değiştirerek metni ayrıştırma
        const words = urlText.split('-');

        // Her kelimenin ilk harfini büyük yapma ve kelimeleri birleştirme
        const originalWords = words.map(word => {
            if (word === 'csharp') {
                return 'C#';
            } else if (word === 'dotnet') {
                return '.NET';
            } else {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
        });

        let originalName = originalWords.join(' ');

        // Parantez içindeki ifadeleri kontrol etme
        const bracketsIndex = originalWords.findIndex(word => word.includes('P'));

        if (bracketsIndex !== -1) {
            
            for (let i = bracketsIndex + 1; i < originalWords.length; i++) {
                if (i !== bracketsIndex + 1) {
                    originalWords[i] = `+ ${originalWords[i]}`;
                } else {
                    originalWords[i] = `${originalWords[i]}`;
                }
            }
            originalWords[bracketsIndex + 1] = `(${originalWords[bracketsIndex + 1]}`;
            originalWords[originalWords.length - 1] = `${originalWords[originalWords.length - 1]})`;
            
            originalWords.splice(bracketsIndex, 1);
            
            originalName = originalWords.join(" ");
        }

        return originalName;
    }

}