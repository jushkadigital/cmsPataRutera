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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.seed = void 0;
var path_1 = require("path");
var promises_1 = require("fs/promises"); // Import promise-based functions
var payload_1 = require("payload");
var _payload_config_1 = require("@payload-config");
// Assuming 'assets' is relative to the Current Working Directory (CWD)
var assetsDir = path_1["default"].resolve('assets'); // Resolve assets dir relative to CWD
/**
 * Asynchronously reads an asset file into a Buffer.
 * Throws an error if the file doesn't exist or cannot be accessed.
 * @param filename - The name of the file within the assets directory.
 * @returns A Promise resolving to a Buffer containing the file data.
 */
var readAssetAsBuffer = function (filename) { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, buffer, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filePath = path_1["default"].join(assetsDir, filename);
                console.log("[readAssetAsBuffer] Attempting to access asset at: ".concat(filePath));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                // Check if file exists and is accessible (async)
                return [4 /*yield*/, (0, promises_1.access)(filePath)];
            case 2:
                // Check if file exists and is accessible (async)
                _a.sent(); // Throws error if fails
                console.log("[readAssetAsBuffer] Reading asset into buffer from: ".concat(filePath));
                return [4 /*yield*/, (0, promises_1.readFile)(filePath)];
            case 3:
                buffer = _a.sent();
                return [2 /*return*/, { buffer: buffer, filename: filename }];
            case 4:
                error_1 = _a.sent();
                // Log specific error details
                if (error_1.code === 'ENOENT') {
                    console.error("[readAssetAsBuffer] Asset file not found at path: ".concat(filePath));
                    console.error("[readAssetAsBuffer] Assets directory resolved relative to CWD: ".concat(assetsDir));
                    throw new Error("Asset file not found: ".concat(filename));
                }
                else {
                    console.error("[readAssetAsBuffer] Error accessing or reading file ".concat(filePath, ":"), error_1);
                    throw new Error("Failed to read asset file ".concat(filename, ": ").concat(error_1.message));
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var seed = function () { return __awaiter(void 0, void 0, void 0, function () {
    var payload, admin, admin2, admin3, _a, icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, _b, icon1Doc, icon2Doc, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc, categories, _c, iconCusco, backgroundCusco, carouselCusco, _d, cuscoMedia, cuscoBackgroundMedia, cuscoCarouselMedia, cuscoDoc, _e, iconIca, backgroundIca, carouselIca, _f, icaMedia, icaBackgroundMedia, icaCarouselMedia, icaDoc, iconPmaldonado, _g, pmaldonadoMedia, pmaldonadoBackgroundMedia, pmaldonadoCarouselMedia, pmaldonadoDoc, Tour, tour1, tour2, tour3, tour4, tour5, tour6, pageDestino, pageHome;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0: return [4 /*yield*/, (0, payload_1.getPayload)({ config: _payload_config_1["default"] })];
            case 1:
                payload = _h.sent();
                return [4 /*yield*/, payload.logger.info('Seeding data...')];
            case 2:
                _h.sent();
                payload.logger.info(process.env.NODE_ENV);
                payload.logger.info("\u2014 Creating admin user...");
                return [4 /*yield*/, payload.create({
                        collection: 'users',
                        data: {
                            email: 'urgosxd@gmail.com',
                            password: '123',
                            roles: ['admin']
                        }
                    })];
            case 3:
                admin = _h.sent();
                return [4 /*yield*/, payload.create({
                        collection: 'users',
                        data: {
                            email: 'dorregaray20@gmail.com',
                            password: '12345',
                            roles: ['admin']
                        }
                    })];
            case 4:
                admin2 = _h.sent();
                return [4 /*yield*/, payload.create({
                        collection: 'users',
                        data: {
                            email: 'perudestinoseguro@gmail.com',
                            password: '12345',
                            roles: ['admin']
                        }
                    })];
            case 5:
                admin3 = _h.sent();
                payload.logger.info("\u2014 Admin user created...");
                // --- Example Reading Buffers (Async) ---
                payload.logger.info("\u2014 Reading asset buffers (async)...");
                return [4 /*yield*/, Promise.all([
                        readAssetAsBuffer('iconDifficulty.svg'),
                        readAssetAsBuffer('iconMaxPassengers.svg'),
                        readAssetAsBuffer('iconDate.svg'),
                        readAssetAsBuffer('iconPassengers.svg'),
                        readAssetAsBuffer('iconItinerario.svg'),
                        readAssetAsBuffer('iconIncluyeNoIncluye.svg'),
                        readAssetAsBuffer('iconPrecios.svg'),
                        readAssetAsBuffer('iconInfo.svg')
                    ])];
            case 6:
                _a = _h.sent(), icon1 = _a[0], icon2 = _a[1], icon3 = _a[2], icon4 = _a[3], icon5 = _a[4], icon6 = _a[5], icon7 = _a[6], icon8 = _a[7];
                payload.logger.info("\u2014 Complete read asset buffers (async)...");
                return [4 /*yield*/, Promise.all([
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Medidor de ejemplo'
                            },
                            file: {
                                data: icon1.buffer,
                                mimetype: 'image/svg+xml',
                                name: icon1.filename,
                                size: icon1.buffer.length
                            }
                        }),
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Icono máximo pasajeros'
                            },
                            file: {
                                data: icon2.buffer,
                                mimetype: 'image/svg+xml',
                                name: icon2.filename,
                                size: icon2.buffer.length
                            }
                        }),
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Icono fecha'
                            },
                            file: {
                                data: icon3.buffer,
                                mimetype: 'image/svg+xml',
                                name: icon3.filename,
                                size: icon3.buffer.length
                            }
                        }),
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Icono Passengers'
                            },
                            file: {
                                data: icon4.buffer,
                                mimetype: 'image/svg+xml',
                                name: icon4.filename,
                                size: icon4.buffer.length
                            }
                        }),
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Icono Itinerario'
                            },
                            file: {
                                data: icon5.buffer,
                                mimetype: 'image/png',
                                name: icon5.filename,
                                size: icon5.buffer.length
                            }
                        }),
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Icono Incluye/No Incluye'
                            },
                            file: {
                                data: icon6.buffer,
                                mimetype: 'image/svg+xml',
                                name: icon6.filename,
                                size: icon6.buffer.length
                            }
                        }),
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Icono Precios'
                            },
                            file: {
                                data: icon7.buffer,
                                mimetype: 'image/svg+xml',
                                name: icon7.filename,
                                size: icon7.buffer.length
                            }
                        }),
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Icono Info'
                            },
                            file: {
                                data: icon8.buffer,
                                mimetype: 'image/svg+xml',
                                name: icon8.filename,
                                size: icon8.buffer.length
                            }
                        })
                    ])
                    // Seed Categories
                ];
            case 7:
                _b = _h.sent(), icon1Doc = _b[0], icon2Doc = _b[1], icon3Doc = _b[2], icon4Doc = _b[3], icon5Doc = _b[4], icon6Doc = _b[5], icon7Doc = _b[6], icon8Doc = _b[7];
                // Seed Categories
                payload.logger.info("\u2014 Seeding Categories...");
                return [4 /*yield*/, Promise.all([
                        payload.create({
                            collection: 'tourCategory',
                            data: {
                                name: 'Cultural'
                            }
                        }),
                        payload.create({
                            collection: 'tourCategory',
                            data: {
                                name: 'Gastronómico'
                            }
                        }),
                    ])];
            case 8:
                categories = _h.sent();
                payload.logger.info("\u2014 Categories seeded...");
                payload.logger.info("\u2014 Seeding Destinations...");
                return [4 /*yield*/, Promise.all([
                        readAssetAsBuffer('cuscoFeature.png'),
                        readAssetAsBuffer('cuscoBackground.png'),
                        readAssetAsBuffer('cuscoCarouselItem.png'),
                    ])];
            case 9:
                _c = _h.sent(), iconCusco = _c[0], backgroundCusco = _c[1], carouselCusco = _c[2];
                return [4 /*yield*/, Promise.all([
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Cusco'
                            },
                            file: {
                                data: iconCusco.buffer,
                                mimetype: 'image/png',
                                name: iconCusco.filename,
                                size: iconCusco.buffer.length
                            }
                        }),
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Fondo Cusco'
                            },
                            file: {
                                data: backgroundCusco.buffer,
                                mimetype: 'image/png',
                                name: backgroundCusco.filename,
                                size: backgroundCusco.buffer.length
                            }
                        }),
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Carousel Cusco'
                            },
                            file: {
                                data: carouselCusco.buffer,
                                mimetype: 'image/png',
                                name: carouselCusco.filename,
                                size: carouselCusco.buffer.length
                            }
                        }),
                    ])];
            case 10:
                _d = _h.sent(), cuscoMedia = _d[0], cuscoBackgroundMedia = _d[1], cuscoCarouselMedia = _d[2];
                return [4 /*yield*/, Promise.all([
                        payload.create({
                            collection: 'destinations',
                            data: {
                                name: 'Cusco',
                                imageDestination: cuscoMedia,
                                backgroundDestination: cuscoBackgroundMedia,
                                carouselItemDestination: cuscoCarouselMedia
                            }
                        }),
                    ])];
            case 11:
                cuscoDoc = _h.sent();
                return [4 /*yield*/, Promise.all([
                        readAssetAsBuffer('icaFeature.png'),
                        readAssetAsBuffer('icaBackground.png'),
                        readAssetAsBuffer('icaCarouselItem.png'),
                    ])];
            case 12:
                _e = _h.sent(), iconIca = _e[0], backgroundIca = _e[1], carouselIca = _e[2];
                return [4 /*yield*/, Promise.all([
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Ica'
                            },
                            file: {
                                data: iconIca.buffer,
                                mimetype: 'image/png',
                                name: iconIca.filename,
                                size: iconIca.buffer.length
                            }
                        }),
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Fondo Ica'
                            },
                            file: {
                                data: backgroundIca.buffer,
                                mimetype: 'image/png',
                                name: backgroundIca.filename,
                                size: backgroundIca.buffer.length
                            }
                        }),
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Carousel Ica'
                            },
                            file: {
                                data: carouselIca.buffer,
                                mimetype: 'image/png',
                                name: carouselIca.filename,
                                size: carouselIca.buffer.length
                            }
                        }),
                    ])];
            case 13:
                _f = _h.sent(), icaMedia = _f[0], icaBackgroundMedia = _f[1], icaCarouselMedia = _f[2];
                return [4 /*yield*/, Promise.all([
                        payload.create({
                            collection: 'destinations',
                            data: {
                                name: 'Ica',
                                imageDestination: icaMedia,
                                backgroundDestination: icaBackgroundMedia,
                                carouselItemDestination: icaCarouselMedia
                            }
                        }),
                    ])];
            case 14:
                icaDoc = _h.sent();
                return [4 /*yield*/, Promise.all([
                        readAssetAsBuffer('pmaldonadoFeature.png'),
                    ])];
            case 15:
                iconPmaldonado = (_h.sent())[0];
                return [4 /*yield*/, Promise.all([
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'P Maldonado'
                            },
                            file: {
                                data: iconPmaldonado.buffer,
                                mimetype: 'image/png',
                                name: iconPmaldonado.filename,
                                size: iconPmaldonado.buffer.length
                            }
                        }),
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Fondo Punta Maldonado'
                            },
                            file: {
                                data: backgroundIca.buffer,
                                mimetype: 'image/png',
                                name: backgroundIca.filename,
                                size: backgroundIca.buffer.length
                            }
                        }),
                        payload.create({
                            collection: 'media',
                            data: {
                                alt: 'Carousel Punta Maldonado'
                            },
                            file: {
                                data: carouselIca.buffer,
                                mimetype: 'image/png',
                                name: carouselIca.filename,
                                size: carouselIca.buffer.length
                            }
                        }),
                    ])];
            case 16:
                _g = _h.sent(), pmaldonadoMedia = _g[0], pmaldonadoBackgroundMedia = _g[1], pmaldonadoCarouselMedia = _g[2];
                return [4 /*yield*/, Promise.all([
                        payload.create({
                            collection: 'destinations',
                            data: {
                                name: 'Punta Maldonado',
                                imageDestination: pmaldonadoMedia,
                                backgroundDestination: pmaldonadoBackgroundMedia,
                                carouselItemDestination: pmaldonadoCarouselMedia
                            }
                        }),
                    ])];
            case 17:
                pmaldonadoDoc = _h.sent();
                payload.logger.info("\u2014 Destinations seeded...");
                payload.logger.info("\u2014 Seeding Tours...");
                Tour = function (_a) {
                    var _b, _c, _d, _e;
                    var slug = _a.slug, title = _a.title, price = _a.price, Images = _a.Images, Categories = _a.Categories, Destinos = _a.Destinos;
                    return {
                        slug: slug,
                        title: title,
                        _status: 'published',
                        heroTour: [
                            {
                                blockType: 'tourHerocar',
                                carContent: {
                                    carImages: [
                                        {
                                            image: Images[0].id
                                        },
                                        {
                                            image: Images[1].id
                                        },
                                    ]
                                },
                                ImageContent: {
                                    image: Images[2].id
                                }
                            }
                        ],
                        layout: [
                            {
                                blockType: 'descrPrice',
                                blockTitle: {
                                    titleText: "Dia completo",
                                    tag: "h2",
                                    size: "medium",
                                    textColor: "#2970B7",
                                    underlineColor: "#EFBA06"
                                },
                                leftColumn: {
                                    tourTitle: "Características Tour Valle Sagrado - Día Completo",
                                    tourDescription: {
                                        root: {
                                            type: "root",
                                            format: "",
                                            indent: 0,
                                            version: 1,
                                            children: [
                                                {
                                                    type: "paragraph",
                                                    format: "",
                                                    indent: 0,
                                                    version: 1,
                                                    children: [
                                                        {
                                                            mode: "normal",
                                                            text: "Hemos creado un itinerario único para el Tour Valle Sagrado – Día Completo para que puedas conocer en pocas horas este maravilloso Valle y los lugares más icónicos de la zona. ",
                                                            type: "text",
                                                            style: "",
                                                            detail: 0,
                                                            format: 0,
                                                            version: 1
                                                        }
                                                    ],
                                                    direction: "ltr",
                                                    textStyle: "",
                                                    textFormat: 0
                                                },
                                                {
                                                    type: "paragraph",
                                                    format: "",
                                                    indent: 0,
                                                    version: 1,
                                                    children: [],
                                                    direction: null,
                                                    textStyle: "",
                                                    textFormat: 0
                                                },
                                                {
                                                    type: "paragraph",
                                                    format: "",
                                                    indent: 0,
                                                    version: 1,
                                                    children: [
                                                        {
                                                            mode: "normal",
                                                            text: "Ubicación del Tour: El Valle Sagrado de los Incas está comprendido entre las poblaciones de Pisac y Ollantaytambo, paralelo al río Vilcanota y se puede acceder a él desde la ciudad del Cusco",
                                                            type: "text",
                                                            style: "",
                                                            detail: 0,
                                                            format: 0,
                                                            version: 1
                                                        }
                                                    ],
                                                    direction: "ltr",
                                                    textStyle: "",
                                                    textFormat: 0
                                                },
                                                {
                                                    type: "paragraph",
                                                    format: "",
                                                    indent: 0,
                                                    version: 1,
                                                    children: [
                                                        {
                                                            mode: "normal",
                                                            text: "Tipo de tour: Tour de día completo",
                                                            type: "text",
                                                            style: "",
                                                            detail: 0,
                                                            format: 0,
                                                            version: 1
                                                        }
                                                    ],
                                                    direction: "ltr",
                                                    textStyle: "",
                                                    textFormat: 0
                                                },
                                                {
                                                    type: "paragraph",
                                                    format: "",
                                                    indent: 0,
                                                    version: 1,
                                                    children: [],
                                                    direction: null,
                                                    textStyle: "",
                                                    textFormat: 0
                                                },
                                                {
                                                    type: "paragraph",
                                                    format: "",
                                                    indent: 0,
                                                    version: 1,
                                                    children: [
                                                        {
                                                            mode: "normal",
                                                            text: "Hora de inicio / finalización: El recojo es a las 8:00 am desde el lobby de su hotel y el retorno será alrededor de las 6 pm ",
                                                            type: "text",
                                                            style: "",
                                                            detail: 0,
                                                            format: 0,
                                                            version: 1
                                                        }
                                                    ],
                                                    direction: "ltr",
                                                    textStyle: "",
                                                    textFormat: 0
                                                },
                                                {
                                                    type: "paragraph",
                                                    format: "",
                                                    indent: 0,
                                                    version: 1,
                                                    children: [
                                                        {
                                                            mode: "normal",
                                                            text: "Consideración: Recuerde usar zapatos cómodos, caminará mucho.",
                                                            type: "text",
                                                            style: "",
                                                            detail: 0,
                                                            format: 0,
                                                            version: 1
                                                        }
                                                    ],
                                                    direction: "ltr",
                                                    textStyle: "",
                                                    textFormat: 0
                                                },
                                                {
                                                    type: "paragraph",
                                                    format: "",
                                                    indent: 0,
                                                    version: 1,
                                                    children: [
                                                        {
                                                            mode: "normal",
                                                            text: "Puntos destacados: Mercado de Pisaq, Complejo arqueológico de Pisaq y la fortaleza de Ollantaytambo.",
                                                            type: "text",
                                                            style: "",
                                                            detail: 0,
                                                            format: 0,
                                                            version: 1
                                                        }
                                                    ],
                                                    direction: "ltr",
                                                    textStyle: "",
                                                    textFormat: 0
                                                },
                                                {
                                                    type: "paragraph",
                                                    format: "",
                                                    indent: 0,
                                                    version: 1,
                                                    children: [
                                                        {
                                                            mode: "normal",
                                                            text: "¡No pierdas tiempo y realiza el Tour Valle Sagrado – Día Completo! ¡Te estamos esperando!",
                                                            type: "text",
                                                            style: "",
                                                            detail: 0,
                                                            format: 0,
                                                            version: 1
                                                        }
                                                    ],
                                                    direction: "ltr",
                                                    textStyle: "",
                                                    textFormat: 0
                                                }
                                            ],
                                            direction: "ltr"
                                        }
                                    }
                                },
                                rightColumn: {
                                    priceTitle: "Precio",
                                    prevText: "Precio desde",
                                    price: price,
                                    nextText: "por persona",
                                    paymentForm: {
                                        iconDate: (_b = Images[4]) === null || _b === void 0 ? void 0 : _b.id,
                                        InputPlaceHolderDate: "Fecha",
                                        iconPassengers: (_c = Images[5]) === null || _c === void 0 ? void 0 : _c.id,
                                        InputPlaceHolderPassengers: "Pasajeros"
                                    }
                                }
                            },
                            {
                                blockType: 'guiaTour',
                                blockTitle: {
                                    titleText: "Guia Rutera",
                                    tag: "h2",
                                    size: "medium",
                                    textColor: "#2970B7",
                                    underlineColor: "#EFBA06"
                                },
                                sectionItinerario: {
                                    iconText: "Itinerario",
                                    iconImage: Images[6].id,
                                    contentSection: {
                                        root: {
                                            type: "root",
                                            format: "",
                                            indent: 0,
                                            version: 1,
                                            children: [
                                                {
                                                    tag: "ul",
                                                    type: "list",
                                                    start: 1,
                                                    format: "",
                                                    indent: 0,
                                                    version: 1,
                                                    children: [
                                                        {
                                                            type: "custom-list-item",
                                                            value: 1,
                                                            format: "",
                                                            indent: 0,
                                                            version: 1,
                                                            children: [
                                                                {
                                                                    mode: "normal",
                                                                    text: "Día 1: Cusco – Piskacucho Km 82 – Llactapata- Ayapata",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "Lo primero que haremos dentro el servicio Camino del Inca Tour Grupal 4D/3N será recogerte directamente en el hotel en Cusco, Urubamba u Ollantaytambo. En el caso de Cusco, te buscamos a las 4:30 AM, desde Urubamba a las 5:30 AM, y si te hospedas en Ollantaytambo, podrás descansar un poco más, ya que pasaremos por ti a las 6:30 AM.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "Luego conduciremos al Km 82, pasaremos por el primer punto de control del Camino Inca para comenzar nuestra caminata. Por favor, asegúrate de tener tu pasaporte original ya que lo necesitarás para poder entrar en el Camino Inca.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                }
                                                            ],
                                                            iconType: "check",
                                                            direction: "ltr"
                                                        },
                                                        {
                                                            type: "custom-list-item",
                                                            value: 2,
                                                            format: "",
                                                            indent: 0,
                                                            version: 1,
                                                            children: [
                                                                {
                                                                    mode: "normal",
                                                                    text: "Día 2: Paso de la mujer muerta (Warmiwañuska) – Paso de Runccuracay – Chaquiccocha",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "El inicio del día será muy temprano, ya que el recorrido es más largo. Caminaremos durante aproximadamente 4 horas hasta el paso más alto de la caminata, el Paso de la Mujer Muerta (4215 metros/13829 pies). Al llegar al paso, tendremos un breve descanso para disfrutar de las vistas, para luego partir de nuevo y descender al siguiente valle, el Valle de Pacaymayu – Río Oculto. Es otra hora y media por el lado del valle hasta nuestro lugar para almorzar, donde tendrás la oportunidad de recargar tus botellas de agua.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "Luego del almuerzo, comenzamos a ascender de nuevo al segundo paso de la caminata. Son 2 horas sobre el paso donde nos detendremos en un pequeño sitio inca llamado Runcu Raccay y veremos dos enormes cascadas por el lado opuesto del valle.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                }
                                                            ],
                                                            iconType: "check",
                                                            direction: "ltr"
                                                        }
                                                    ],
                                                    listType: "bullet",
                                                    direction: "ltr"
                                                }
                                            ],
                                            direction: "ltr"
                                        }
                                    }
                                },
                                sectionIncluyeNoIncluye: {
                                    iconText: "Incluye/No Incluye",
                                    iconImage: Images[7].id,
                                    contentSection: {
                                        root: {
                                            type: "root",
                                            format: "",
                                            indent: 0,
                                            version: 1,
                                            children: [
                                                {
                                                    tag: "ul",
                                                    type: "list",
                                                    start: 1,
                                                    format: "",
                                                    indent: 0,
                                                    version: 1,
                                                    children: [
                                                        {
                                                            type: "custom-list-item",
                                                            value: 1,
                                                            format: "",
                                                            indent: 0,
                                                            version: 1,
                                                            children: [
                                                                {
                                                                    mode: "normal",
                                                                    text: "Día 1: Cusco – Piskacucho Km 82 – Llactapata- Ayapata",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "Lo primero que haremos dentro el servicio Camino del Inca Tour Grupal 4D/3N será recogerte directamente en el hotel en Cusco, Urubamba u Ollantaytambo. En el caso de Cusco, te buscamos a las 4:30 AM, desde Urubamba a las 5:30 AM, y si te hospedas en Ollantaytambo, podrás descansar un poco más, ya que pasaremos por ti a las 6:30 AM.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "Luego conduciremos al Km 82, pasaremos por el primer punto de control del Camino Inca para comenzar nuestra caminata. Por favor, asegúrate de tener tu pasaporte original ya que lo necesitarás para poder entrar en el Camino Inca.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                }
                                                            ],
                                                            iconType: "check",
                                                            direction: "ltr"
                                                        },
                                                        {
                                                            type: "custom-list-item",
                                                            value: 2,
                                                            format: "",
                                                            indent: 0,
                                                            version: 1,
                                                            children: [
                                                                {
                                                                    mode: "normal",
                                                                    text: "Día 2: Paso de la mujer muerta (Warmiwañuska) – Paso de Runccuracay – Chaquiccocha",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "El inicio del día será muy temprano, ya que el recorrido es más largo. Caminaremos durante aproximadamente 4 horas hasta el paso más alto de la caminata, el Paso de la Mujer Muerta (4215 metros/13829 pies). Al llegar al paso, tendremos un breve descanso para disfrutar de las vistas, para luego partir de nuevo y descender al siguiente valle, el Valle de Pacaymayu – Río Oculto. Es otra hora y media por el lado del valle hasta nuestro lugar para almorzar, donde tendrás la oportunidad de recargar tus botellas de agua.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "Luego del almuerzo, comenzamos a ascender de nuevo al segundo paso de la caminata. Son 2 horas sobre el paso donde nos detendremos en un pequeño sitio inca llamado Runcu Raccay y veremos dos enormes cascadas por el lado opuesto del valle.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                }
                                                            ],
                                                            iconType: "check",
                                                            direction: "ltr"
                                                        }
                                                    ],
                                                    listType: "bullet",
                                                    direction: "ltr"
                                                }
                                            ],
                                            direction: "ltr"
                                        }
                                    }
                                },
                                sectionPrecios: {
                                    iconText: "Precios",
                                    iconImage: Images[8].id,
                                    contentSection: {
                                        root: {
                                            type: "root",
                                            format: "",
                                            indent: 0,
                                            version: 1,
                                            children: [
                                                {
                                                    tag: "ul",
                                                    type: "list",
                                                    start: 1,
                                                    format: "",
                                                    indent: 0,
                                                    version: 1,
                                                    children: [
                                                        {
                                                            type: "custom-list-item",
                                                            value: 1,
                                                            format: "",
                                                            indent: 0,
                                                            version: 1,
                                                            children: [
                                                                {
                                                                    mode: "normal",
                                                                    text: "Día 1: Cusco – Piskacucho Km 82 – Llactapata- Ayapata",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "Lo primero que haremos dentro el servicio Camino del Inca Tour Grupal 4D/3N será recogerte directamente en el hotel en Cusco, Urubamba u Ollantaytambo. En el caso de Cusco, te buscamos a las 4:30 AM, desde Urubamba a las 5:30 AM, y si te hospedas en Ollantaytambo, podrás descansar un poco más, ya que pasaremos por ti a las 6:30 AM.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "Luego conduciremos al Km 82, pasaremos por el primer punto de control del Camino Inca para comenzar nuestra caminata. Por favor, asegúrate de tener tu pasaporte original ya que lo necesitarás para poder entrar en el Camino Inca.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                }
                                                            ],
                                                            iconType: "check",
                                                            direction: "ltr"
                                                        },
                                                        {
                                                            type: "custom-list-item",
                                                            value: 2,
                                                            format: "",
                                                            indent: 0,
                                                            version: 1,
                                                            children: [
                                                                {
                                                                    mode: "normal",
                                                                    text: "Día 2: Paso de la mujer muerta (Warmiwañuska) – Paso de Runccuracay – Chaquiccocha",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "El inicio del día será muy temprano, ya que el recorrido es más largo. Caminaremos durante aproximadamente 4 horas hasta el paso más alto de la caminata, el Paso de la Mujer Muerta (4215 metros/13829 pies). Al llegar al paso, tendremos un breve descanso para disfrutar de las vistas, para luego partir de nuevo y descender al siguiente valle, el Valle de Pacaymayu – Río Oculto. Es otra hora y media por el lado del valle hasta nuestro lugar para almorzar, donde tendrás la oportunidad de recargar tus botellas de agua.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "Luego del almuerzo, comenzamos a ascender de nuevo al segundo paso de la caminata. Son 2 horas sobre el paso donde nos detendremos en un pequeño sitio inca llamado Runcu Raccay y veremos dos enormes cascadas por el lado opuesto del valle.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                }
                                                            ],
                                                            iconType: "check",
                                                            direction: "ltr"
                                                        }
                                                    ],
                                                    listType: "bullet",
                                                    direction: "ltr"
                                                }
                                            ],
                                            direction: "ltr"
                                        }
                                    }
                                },
                                sectionInfoViaje: {
                                    iconText: "Información del viaje",
                                    iconImage: Images[9].id,
                                    contentSection: {
                                        root: {
                                            type: "root",
                                            format: "",
                                            indent: 0,
                                            version: 1,
                                            children: [
                                                {
                                                    tag: "ul",
                                                    type: "list",
                                                    start: 1,
                                                    format: "",
                                                    indent: 0,
                                                    version: 1,
                                                    children: [
                                                        {
                                                            type: "custom-list-item",
                                                            value: 1,
                                                            format: "",
                                                            indent: 0,
                                                            version: 1,
                                                            children: [
                                                                {
                                                                    mode: "normal",
                                                                    text: "Día 1: Cusco – Piskacucho Km 82 – Llactapata- Ayapata",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "Lo primero que haremos dentro el servicio Camino del Inca Tour Grupal 4D/3N será recogerte directamente en el hotel en Cusco, Urubamba u Ollantaytambo. En el caso de Cusco, te buscamos a las 4:30 AM, desde Urubamba a las 5:30 AM, y si te hospedas en Ollantaytambo, podrás descansar un poco más, ya que pasaremos por ti a las 6:30 AM.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "Luego conduciremos al Km 82, pasaremos por el primer punto de control del Camino Inca para comenzar nuestra caminata. Por favor, asegúrate de tener tu pasaporte original ya que lo necesitarás para poder entrar en el Camino Inca.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                }
                                                            ],
                                                            iconType: "check",
                                                            direction: "ltr"
                                                        },
                                                        {
                                                            type: "custom-list-item",
                                                            value: 2,
                                                            format: "",
                                                            indent: 0,
                                                            version: 1,
                                                            children: [
                                                                {
                                                                    mode: "normal",
                                                                    text: "Día 2: Paso de la mujer muerta (Warmiwañuska) – Paso de Runccuracay – Chaquiccocha",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "El inicio del día será muy temprano, ya que el recorrido es más largo. Caminaremos durante aproximadamente 4 horas hasta el paso más alto de la caminata, el Paso de la Mujer Muerta (4215 metros/13829 pies). Al llegar al paso, tendremos un breve descanso para disfrutar de las vistas, para luego partir de nuevo y descender al siguiente valle, el Valle de Pacaymayu – Río Oculto. Es otra hora y media por el lado del valle hasta nuestro lugar para almorzar, donde tendrás la oportunidad de recargar tus botellas de agua.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    type: "linebreak",
                                                                    version: 1
                                                                },
                                                                {
                                                                    mode: "normal",
                                                                    text: "Luego del almuerzo, comenzamos a ascender de nuevo al segundo paso de la caminata. Son 2 horas sobre el paso donde nos detendremos en un pequeño sitio inca llamado Runcu Raccay y veremos dos enormes cascadas por el lado opuesto del valle.",
                                                                    type: "text",
                                                                    style: "",
                                                                    detail: 0,
                                                                    format: 0,
                                                                    version: 1
                                                                }
                                                            ],
                                                            iconType: "check",
                                                            direction: "ltr"
                                                        }
                                                    ],
                                                    listType: "bullet",
                                                    direction: "ltr"
                                                }
                                            ],
                                            direction: "ltr"
                                        }
                                    }
                                }
                            }
                        ],
                        featuredImage: Images[10].id,
                        miniDescription: {
                            root: {
                                type: "root",
                                format: "",
                                indent: 0,
                                version: 1,
                                children: [
                                    {
                                        type: "paragraph",
                                        format: "",
                                        indent: 0,
                                        version: 1,
                                        children: [
                                            {
                                                mode: "normal",
                                                text: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
                                                type: "text",
                                                style: "",
                                                detail: 0,
                                                format: 0,
                                                version: 1
                                            }
                                        ],
                                        direction: "ltr",
                                        textStyle: "",
                                        textFormat: 0
                                    }
                                ],
                                direction: "ltr"
                            }
                        },
                        Desde: "Desde",
                        price: price,
                        "Person desc": "por persona",
                        iconMaxPassengers: (_d = Images[11]) === null || _d === void 0 ? void 0 : _d.id,
                        maxPassengers: 10,
                        iconDifficulty: (_e = Images[12]) === null || _e === void 0 ? void 0 : _e.id,
                        difficulty: "medium",
                        categorias: __spreadArray([], Categories, true),
                        destinos: Destinos,
                        publishedAt: new Date().toISOString()
                    };
                };
                return [4 /*yield*/, payload.create({
                        collection: 'tours',
                        depth: 1,
                        data: Tour({ slug: 'tour-valle-sagrado', title: 'Tour Valle Sagrado', price: 150, Images: [cuscoMedia, icaMedia, pmaldonadoMedia, icaBackgroundMedia, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc, cuscoMedia, icon1Doc, icon2Doc], Categories: __spreadArray([], categories, true), Destinos: cuscoDoc[0] })
                    })];
            case 18:
                tour1 = _h.sent();
                return [4 /*yield*/, payload.create({
                        collection: 'tours',
                        depth: 1,
                        data: Tour({ slug: 'oasis-huacachina', title: 'Oasis Huacachina', price: 150, Images: [cuscoMedia, icaMedia, pmaldonadoMedia, icaBackgroundMedia, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc, cuscoMedia, icon1Doc, icon2Doc], Categories: __spreadArray([], categories, true), Destinos: cuscoDoc[0] })
                    })];
            case 19:
                tour2 = _h.sent();
                return [4 /*yield*/, payload.create({
                        collection: 'tours',
                        depth: 1,
                        data: Tour({ slug: 'lago-sandoval', title: 'Lago Sandoval', price: 150, Images: [cuscoMedia, icaMedia, pmaldonadoMedia, icaBackgroundMedia, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc, cuscoMedia, icon1Doc, icon2Doc], Categories: __spreadArray([], categories, true), Destinos: cuscoDoc[0] })
                    })];
            case 20:
                tour3 = _h.sent();
                return [4 /*yield*/, payload.create({
                        collection: 'tours',
                        depth: 1,
                        data: Tour({ slug: 'ccaccaccollo', title: 'Ccaccaccollo', price: 150, Images: [cuscoMedia, icaMedia, pmaldonadoMedia, icaBackgroundMedia, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc, cuscoMedia, icon1Doc, icon2Doc], Categories: __spreadArray([], categories, true), Destinos: icaDoc[0] })
                    })];
            case 21:
                tour4 = _h.sent();
                return [4 /*yield*/, payload.create({
                        collection: 'tours',
                        depth: 1,
                        data: Tour({ slug: 'laguna-humantay', title: 'Laguna Humantay', price: 150, Images: [cuscoMedia, icaMedia, pmaldonadoMedia, icaBackgroundMedia, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc, cuscoMedia, icon1Doc, icon2Doc], Categories: __spreadArray([], categories, true), Destinos: icaDoc[0] })
                    })];
            case 22:
                tour5 = _h.sent();
                return [4 /*yield*/, payload.create({
                        collection: 'tours',
                        depth: 1,
                        data: Tour({ slug: 'city-tour-ica', title: 'City Tour Ica', price: 150, Images: [cuscoMedia, icaMedia, pmaldonadoMedia, icaBackgroundMedia, icon3Doc, icon4Doc, icon5Doc, icon6Doc, icon7Doc, icon8Doc, cuscoMedia, icon1Doc, icon2Doc], Categories: __spreadArray([], categories, true), Destinos: icaDoc[0] })
                    })];
            case 23:
                tour6 = _h.sent();
                payload.logger.info("\u2014 Tours Seededd...");
                payload.logger.info("\u2014 Seeding Page...");
                return [4 /*yield*/, payload.create({
                        collection: 'pages',
                        data: {
                            title: "destinos",
                            layout: [
                                {
                                    overrideDefaults: true,
                                    gridColumns: null,
                                    blockType: "gridTours",
                                    blockTitle: {
                                        titleText: "Tours",
                                        tag: "h2",
                                        size: "medium",
                                        textColor: "#2970B7",
                                        underlineColor: "#EFBA06"
                                    },
                                    category: [],
                                    gridStyle: true,
                                    destination: null
                                }
                            ],
                            publishedAt: new Date().toISOString(),
                            slug: "destinos",
                            slugLock: true,
                            _status: "published",
                            heroPageBlocks: [
                                {
                                    overrideDefaults: true,
                                    title: null,
                                    image: null,
                                    blockName: null,
                                    blockType: "banner"
                                }
                            ]
                        }
                    })];
            case 24:
                pageDestino = _h.sent();
                return [4 /*yield*/, payload.create({
                        collection: 'pages',
                        data: {
                            title: "home",
                            heroPageBlocks: [
                                {
                                    blockName: null,
                                    blockType: "carouselHeroPage"
                                }
                            ],
                            layout: [
                                {
                                    overrideDefaults: false,
                                    gridColumns: 6,
                                    gridStyle: true,
                                    destination: null,
                                    blockName: null,
                                    blockType: "gridTours",
                                    blockTitle: {
                                        titleText: "Tours",
                                        tag: "h2",
                                        size: "medium",
                                        textColor: "#2970B7",
                                        underlineColor: "#EFBA06"
                                    },
                                    category: []
                                },
                                {
                                    blockName: null,
                                    blockType: "carouselDestination",
                                    title: {
                                        titleText: "Destinos",
                                        tag: "h2",
                                        size: "medium",
                                        textColor: "#2970B7",
                                        underlineColor: "#EFBA06"
                                    }
                                }
                            ],
                            publishedAt: new Date().toISOString(),
                            slug: "home",
                            slugLock: true,
                            _status: "published"
                        }
                    })];
            case 25:
                pageHome = _h.sent();
                payload.logger.info("\u2014 Page Seeded...");
                return [2 /*return*/];
        }
    });
}); };
exports.seed = seed;
