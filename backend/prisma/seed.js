"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.product.deleteMany({})];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.product.createMany({
                            data: [
                                {
                                    name: 'SKIN1004 - Protector Solar Madagascar Centella Hyalu-Cica Water-Fit Sun Serum',
                                    slug: 'skin1004-protector-solar-madagascar-centella-hyalu-cica-water-fit-sun-serum',
                                    description: 'Protección solar ligera con centella y ácido hialurónico.',
                                    price: 50000,
                                    imageUrl: '/images/products/protector-solar_madagascar-centella-hyalu-cica-water-fit-sun-serum.webp',
                                    type: 'protectores-solares',
                                    solution: 'proteccion-solar',
                                },
                                {
                                    name: 'Medicube - Crema Facial Deep Vita C Capsule Cream',
                                    slug: 'medicube-crema-facial-deep-vita-c-capsule-cream',
                                    description: 'Crema facial hidratante con vitamina C para un tono más luminoso.',
                                    price: 42000,
                                    imageUrl: '/images/products/hidratante_medicube-crema-facial-deep-vita-c-capsule-cream.webp',
                                    type: 'hidratantes',
                                    solution: 'deshidratacion',
                                },
                                {
                                    name: 'Dr. Althea - Crema 345 Relief',
                                    slug: 'dr-althea-crema-345-relief',
                                    description: 'Crema calmante y reparadora para piel sensible.',
                                    price: 39000,
                                    imageUrl: '/images/products/hidrantate_dr-althea-crema-345-relief.webp',
                                    type: 'hidratantes',
                                    solution: 'deshidratacion',
                                },
                                {
                                    name: 'KSECRET - Crema Contorno de Ojos SEOUL 1988 Eye Cream',
                                    slug: 'ksecret-crema-contorno-de-ojos-seoul-1988-eye-cream',
                                    description: 'Contorno de ojos con retinal liposome y péptidos.',
                                    price: 36000,
                                    imageUrl: '/images/products/Contorno de Ojos_ksecret-crema-contorno-de-ojos-seoul-1988-eye-cream-retinal-liposome-4-fermented-bean.webp',
                                    type: 'contorno-de-ojos',
                                    solution: 'antiarrugas',
                                },
                                {
                                    name: 'Medicube - Sérum Antiedad PDRN Pink Peptide Serum',
                                    slug: 'medicube-serum-antiedad-pdrn-pink-peptide-serum',
                                    description: 'Sérum antiedad con tecnología PDRN y péptidos.',
                                    price: 45000,
                                    imageUrl: '/images/products/serums_medicube-serum-antiedad-pdrn-pink-peptide-serum.webp',
                                    type: 'sueros',
                                    solution: 'antiarrugas',
                                },
                                {
                                    name: 'celimax - Sérum The Vita-A Retinol Shot Tightening',
                                    slug: 'celimax-serum-the-vita-a-retinol-shot-tightening',
                                    description: 'Sérum con retinol para renovar la textura y firmeza.',
                                    price: 44000,
                                    imageUrl: '/images/products/serums_celimax-serum-the-vita-a-retinol-shot-tightening.webp',
                                    type: 'sueros',
                                    solution: 'antiarrugas',
                                },
                                {
                                    name: 'Medicube - Sérum TXA Niacinamide 15',
                                    slug: 'medicube-serum-txa-niacinamide-15',
                                    description: 'Sérum de niacinamida para unificar el tono y reducir brillos.',
                                    price: 43000,
                                    imageUrl: '/images/products/serums_medicube-txa-niacinamide-15.webp',
                                    type: 'sueros',
                                    solution: 'poros-y-brillo',
                                },
                                {
                                    name: 'Medicube - Mascarilla Envolvente Nocturna Collagen Night Wrapping Mask',
                                    slug: 'medicube-mascarilla-envolvente-nocturna-collagen-night-wrapping-mask',
                                    description: 'Mascarilla nocturna con colágeno para nutrición profunda.',
                                    price: 46000,
                                    imageUrl: '/images/products/mascarillas_medicube-envolvente-nocturna-collagen-night-wrapping-mask.webp',
                                    type: 'mascarillas',
                                    solution: 'hidratacion',
                                },
                                {
                                    name: 'Medicube - Set de Mascarillas Faciales PDRN Pink Collagen Gel Mask Set',
                                    slug: 'medicube-set-de-mascarillas-faciales-pdrn-pink-collagen-gel-mask-set',
                                    description: 'Set de mascarillas con colágeno y cuidado intensivo.',
                                    price: 51000,
                                    imageUrl: '/images/products/mascarillas_medicube-set-de-mascarillas-faciales-pdrn-pink-collagen-gel-mask-set.webp',
                                    type: 'mascarillas',
                                    solution: 'hidratacion',
                                },
                                {
                                    name: 'Tonificador Facial Hidratante',
                                    slug: 'tonificador-facial-hidratante',
                                    description: 'Tónico hidratante con extractos naturales para equilibrio y confort.',
                                    price: 22990,
                                    imageUrl: '/images/products/tonificador-facial.webp',
                                    type: 'tonicos',
                                    solution: 'deshidratacion',
                                },
                            ],
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return console.log('Seed completado'); })
    .catch(function (e) { return console.error(e); })
    .finally(function () { return prisma.$disconnect(); });
