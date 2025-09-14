import { IProduct } from "@typings/productTypings";
import { IUser } from "@typings/userTypings";

type userIdType = string;
type productIdType = string;
class ProductStorage {
    public productList: IProduct[];
    public usersProductTracking: Record<userIdType, Set<productIdType>>;

    constructor() {
        this.productList = [
            { id: "p1", name: "Wireless Mouse" },
            { id: "p2", name: "Mechanical Keyboard" },
            { id: "p3", name: "Gaming Monitor" },
            { id: "p4", name: "USB-C Hub" },
            { id: "p5", name: "Noise Cancelling Headphones" },
            { id: "p6", name: "Portable SSD" },
            { id: "p7", name: "Smartphone Stand" },
            { id: "p8", name: "Laptop Cooling Pad" },
            { id: "p9", name: "Ergonomic Chair" },
            { id: "p10", name: "LED Desk Lamp" },
            { id: "p11", name: "Bluetooth Speaker" },
            { id: "p12", name: "4K Webcam" },
            { id: "p13", name: "Wireless Charger" },
            { id: "p14", name: "Smartwatch" },
            { id: "p15", name: "Tablet Stylus" },
            { id: "p16", name: "VR Headset" },
            { id: "p17", name: "Action Camera" },
            { id: "p18", name: "Tripod Stand" },
            { id: "p19", name: "Green Screen" },
            { id: "p20", name: "Capture Card" },
            { id: "p21", name: "External Hard Drive" },
            { id: "p22", name: "Wireless Earbuds" },
            { id: "p23", name: "Gaming Controller" },
            { id: "p24", name: "Streaming Microphone" },
            { id: "p25", name: "Ring Light" },
            { id: "p26", name: "Smart Home Hub" },
            { id: "p27", name: "Wi-Fi Router" },
            { id: "p28", name: "Mesh Wi-Fi System" },
            { id: "p29", name: "Network Switch" },
            { id: "p30", name: "NAS Storage" },
            { id: "p31", name: "Fitness Tracker" },
            { id: "p32", name: "E-Reader" },
            { id: "p33", name: "Portable Projector" },
            { id: "p34", name: "Smart Light Bulb" },
            { id: "p35", name: "Smart Plug" },
            { id: "p36", name: "Robot Vacuum" },
            { id: "p37", name: "Smart Thermostat" },
            { id: "p38", name: "Security Camera" },
            { id: "p39", name: "Doorbell Camera" },
            { id: "p40", name: "3D Printer" },
            { id: "p41", name: "Filament Spool" },
            { id: "p42", name: "Portable Power Bank" },
            { id: "p43", name: "Solar Charger" },
            { id: "p44", name: "Smart Glasses" },
            { id: "p45", name: "Electric Scooter" },
            { id: "p46", name: "Drone" },
            { id: "p47", name: "Drone Controller" },
            { id: "p48", name: "Camera Lens Kit" },
            { id: "p49", name: "Photography Backpack" },
            { id: "p50", name: "Gimbal Stabilizer" },
            { id: "p51", name: "Noise Meter" },
            { id: "p52", name: "Smart Door Lock" },
            { id: "p53", name: "Baby Monitor" },
            { id: "p54", name: "Smart Scale" },
            { id: "p55", name: "Electric Toothbrush" },
            { id: "p56", name: "Air Purifier" },
            { id: "p57", name: "Dehumidifier" },
            { id: "p58", name: "Smart Coffee Maker" },
            { id: "p59", name: "Espresso Machine" },
            { id: "p60", name: "Blender" },
            { id: "p61", name: "Instant Pot" },
            { id: "p62", name: "Air Fryer" },
            { id: "p63", name: "Electric Kettle" },
            { id: "p64", name: "Rice Cooker" },
            { id: "p65", name: "Toaster Oven" },
            { id: "p66", name: "Microwave Oven" },
            { id: "p67", name: "Mini Fridge" },
            { id: "p68", name: "Dishwasher" },
            { id: "p69", name: "Washing Machine" },
            { id: "p70", name: "Clothes Dryer" },
            { id: "p71", name: "Vacuum Cleaner" },
            { id: "p72", name: "Steam Mop" },
            { id: "p73", name: "Iron" },
            { id: "p74", name: "Sewing Machine" },
            { id: "p75", name: "Smart TV" },
            { id: "p76", name: "Soundbar" },
            { id: "p77", name: "Home Theater System" },
            { id: "p78", name: "Streaming Stick" },
            { id: "p79", name: "Blu-ray Player" },
            { id: "p80", name: "Vinyl Record Player" },
            { id: "p81", name: "Electric Guitar" },
            { id: "p82", name: "Digital Piano" },
            { id: "p83", name: "MIDI Keyboard" },
            { id: "p84", name: "Studio Headphones" },
            { id: "p85", name: "Audio Interface" },
            { id: "p86", name: "DJ Controller" },
            { id: "p87", name: "Drum Machine" },
            { id: "p88", name: "Synthesizer" },
            { id: "p89", name: "Guitar Pedal" },
            { id: "p90", name: "Microphone Stand" },
            { id: "p91", name: "Camping Tent" },
            { id: "p92", name: "Sleeping Bag" },
            { id: "p93", name: "Hiking Backpack" },
            { id: "p94", name: "Portable Stove" },
            { id: "p95", name: "Water Filter Bottle" },
            { id: "p96", name: "Binoculars" },
            { id: "p97", name: "Action Binocular Mount" },
            { id: "p98", name: "Climbing Helmet" },
            { id: "p99", name: "Kayak" },
            { id: "p100", name: "Electric Bike" },
        ];

        this.usersProductTracking = {};
    }

    public registerUserView(user: IUser, productId: string): boolean {
        const product = this.productList.find((productToFind) => productToFind.id === productId);
        const register = (key: string, id: string) => {
            if (!this.usersProductTracking[key]) {
                this.usersProductTracking[key] = new Set([]);
            }
            this.usersProductTracking[key].add(id);
        };
        register(user?.id || "", productId);
        console.log({
            [user?.id || ""]: this.usersProductTracking[user?.id || ""],
        });
        return !!product;
    }

    public searchProductsFromStorage(term: string) {
        const products = this.productList.filter((product) => product.name.includes(term) || product.id.includes(term));
        return {products};
    }
}

export const productStorage = new ProductStorage();
