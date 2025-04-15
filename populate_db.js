require('dotenv').config();
const db = require('./models');
const bcrypt = require('bcryptjs');

// Helper function to hash passwords
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Sample shipping addresses
const sampleAddresses = [
    {
        street: "123 Tech Street",
        city: "Bangalore",
        state: "Karnataka",
        zipCode: "560001",
        country: "India"
    },
    {
        street: "456 Developer Road",
        city: "Hyderabad",
        state: "Telangana",
        zipCode: "500081",
        country: "India"
    },
    {
        street: "789 Coder Lane",
        city: "Pune",
        state: "Maharashtra",
        zipCode: "411001",
        country: "India"
    },
    {
        street: "101 Programmer Avenue",
        city: "Delhi",
        state: "Delhi",
        zipCode: "110001",
        country: "India"
    }
];

// Main population function
const populateDatabase = async () => {
    try {
        console.log('Starting database population...');

        // Disable foreign key checks temporarily
        console.log('Disabling foreign key checks...');
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        // Clear existing data in the correct order
        console.log('Clearing existing data...');
        await db.OrderItem.destroy({ where: {}, truncate: true, cascade: true, force: true });
        await db.Order.destroy({ where: {}, truncate: true, cascade: true, force: true });
        await db.Product.destroy({ where: {}, truncate: true, cascade: true, force: true });
        await db.User.destroy({ where: {}, truncate: true, cascade: true, force: true });

        // Re-enable foreign key checks
        console.log('Re-enabling foreign key checks...');
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        // Create users
        console.log('Creating users...');
        const users = await db.User.bulkCreate([
            // Admins
            {
                name: 'Sachit Rajpal',
                email: 'sachit.rajpal@example.com',
                password: await hashPassword('admin123'),
                isAdmin: true
            },
            {
                name: 'Sharad Chandel',
                email: 'sharad.chandel@example.com',
                password: await hashPassword('admin123'),
                isAdmin: true
            },

            // Regular users
            {
                name: 'Rudar Partap Singh',
                email: 'rudar.singh@example.com',
                password: await hashPassword('admin123')
            },
            {
                name: 'Smarth Sharda',
                email: 'smarth.sharda@example.com',
                password: await hashPassword('admin123')
            },
            {
                name: 'Shaiv Sud',
                email: 'shaiv.sud@example.com',
                password: await hashPassword('admin123')
            },
            {
                name: 'Safal Varadhan',
                email: 'safal.varadhan@example.com',
                password: await hashPassword('admin123')
            },
            {
                name: 'Sachin Kumar Thakur',
                email: 'sachin.thakur@example.com',
                password: await hashPassword('admin123')
            },
            {
                name: 'Rudar Attri',
                email: 'rudar.attri@example.com',
                password: await hashPassword('admin123')
            },
            {
                name: 'Ishan Tripathi',
                email: 'ishan.tripathi@example.com',
                password: await hashPassword('admin123')
            }
        ]);

        // Create products
        console.log('Creating products...');
        const products = await db.Product.bulkCreate([
            // Painting Supplies
            {
                name: 'Acrylic Paint Set (24 Colors)',
                description: 'Premium quality acrylic paints with vibrant colors, perfect for canvas painting',
                price: 24.99,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/xif0q/paint/u/l/e/24-36-acrylic-paint-set-24-colours-36ml-perfect-for-canvas-wood-original-imaggp76jph7gmwg.jpeg?q=70&crop=false',
                stock: 50
            },
            {
                name: 'Watercolor Paint Palette',
                description: 'Professional watercolor set with 36 rich pigments',
                price: 32.50,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/kjiwfbk0-0/paint/2/o/v/perfect-return-gifts-for-birthday-party-for-kids-shubhkraft-original-imafz2pxhhjrz5qz.jpeg?q=70&crop=false',
                stock: 30
            },
            {
                name: 'Oil Painting Starter Kit',
                description: 'Complete kit for beginners with 12 oil colors, brushes, and palette',
                price: 45.75,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/xif0q/painting/8/a/3/20-1-diy-canvas-oil-painting-kit-for-kids-or-beginner-with-paint-original-imah2y49xysnudu3.jpeg?q=70&crop=false',
                stock: 20
            },

            // Drawing Materials
            {
                name: 'Sketching Pencil Set (12 pcs)',
                description: 'Graphite pencils ranging from 6H to 8B for all sketching needs',
                price: 15.99,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/kzhbfrk0/art-set/c/k/i/artline-set-of-6-love-art-sketch-pencils-blending-smudging-original-imagbhjgpkmqqxfm.jpeg?q=70&crop=false',
                stock: 100
            },
            {
                name: 'Charcoal Drawing Kit',
                description: 'Professional charcoal set with various sticks and blending tools',
                price: 22.40,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/xif0q/marker-highlighter/d/c/m/35-pc-art-sketching-kit-graphite-charcoal-drawing-pencil-set-for-original-imaghqvyytggh6ha.jpeg?q=70&crop=false',
                stock: 40
            },
            {
                name: 'Pastel Collection (48 colors)',
                description: 'Soft pastels in a wide range of colors for vibrant artwork',
                price: 38.90,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/jlsc58w0/crayon/w/s/n/camel-kokuyo-soft-pastels-camlin-original-imaf8psnzkhjc9zh.jpeg?q=70&crop=false',
                stock: 25
            },

            // Craft Supplies
            {
                name: 'Origami Paper Pack (100 sheets)',
                description: 'Colorful origami papers with traditional Japanese patterns',
                price: 12.95,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/l1jmc280/paper/d/y/d/a4-neon-origami-pack-of-100-1-origami-paper-sharma-business-original-imagd3cg5zzmhd3m.jpeg?q=70&crop=false',
                stock: 80
            },
            {
                name: 'Bead Jewelry Making Kit',
                description: 'Complete kit with beads, wires, and tools for making jewelry',
                price: 29.99,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/xif0q/jewelry-design-template/a/s/u/1-diy-craft-bead-set-necklace-bracelets-jewelry-making-kits-original-imagvyavgpyffcbh.jpeg?q=70&crop=false',
                stock: 35
            },
            {
                name: 'Pottery Clay (5 lbs)',
                description: 'Air-dry clay perfect for sculpting and pottery projects',
                price: 18.75,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/xif0q/art-clay/s/x/l/100-air-dry-clay-pack-of-24-for-kid-s-coycoyy-original-imah9bcnqgzmprdr.jpeg?q=70&crop=false',
                stock: 60
            },

            // Canvas and Paper
            {
                name: 'Stretched Canvas Set (3 pieces)',
                description: 'Premium cotton canvases ready for painting (12x16 inches)',
                price: 27.50,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/xif0q/canvas/b/f/j/canvas-panels-100-cotton-gesso-size-4x4-inch-pack-of-6-square-original-imahaz4arjgq6htj.jpeg?q=70&crop=false',
                stock: 45
            },
            {
                name: 'Mixed Media Sketchbook',
                description: 'Heavyweight paper suitable for all dry media (100 sheets)',
                price: 19.95,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/xif0q/sketch-pad/v/r/y/25-handmade-drawing-paper-a4-sketch-book-for-water-acrylic-oil-original-imah4sp8zzgrvxzz.jpeg?q=70&crop=false',
                stock: 70
            },
            {
                name: 'Watercolor Paper Pad',
                description: 'Cold-pressed 140lb paper perfect for watercolor techniques',
                price: 23.80,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/xif0q/sketch-pad/j/f/r/24-a5-watercolor-glued-sketch-paper-pad-300-gsm-cold-pressed-1-5-original-imagn397wwwkht9h.jpeg?q=70&crop=false',
                stock: 55
            },

            // Brushes and Tools
            {
                name: 'Artist Brush Set (10 pcs)',
                description: 'High-quality synthetic brushes for acrylic and oil painting',
                price: 34.25,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/krce64w0/paint-brush/y/n/v/painting-brushes-set-of-12-professional-round-pointed-tip-nylon-original-imag55grazcfygnc.jpeg?q=70&crop=false',
                stock: 40
            },
            {
                name: 'Calligraphy Pen Set',
                description: 'Beginner calligraphy set with 3 nibs and ink',
                price: 21.50,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/kjvrdzk0/pen/o/n/s/calligraphy-pen-set-of-12-brustro-original-imafzchaftmbhzgk.jpeg?q=70&crop=false',
                stock: 30
            },
            {
                name: 'Wood Burning Tool Kit',
                description: 'Complete pyrography set with 10 tips and patterns',
                price: 42.99,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/kcjexe80/soldering-iron/s/v/n/40pcs-2-in-1-wood-burning-soldering-iron-set-with-adjustable-original-imaftn9jqzwgewxc.jpeg?q=70&crop=false',
                stock: 15
            },

            // DIY Kits
            {
                name: 'Macrame Wall Hanging Kit',
                description: 'All materials included to create a boho-style wall decor',
                price: 31.75,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/kz1lle80/hanging-organizer/k/p/w/38-hs39hearth023550-heart-home-55-original-imagb5a7pme8sd2g.jpeg?q=70&crop=false',
                stock: 25
            },
            {
                name: 'Resin Art Starter Set',
                description: 'Epoxy resin with molds, pigments, and tools for resin art',
                price: 49.95,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/xif0q/art-craft-kit/r/n/v/3-109-pcs-silicone-resin-moulds-for-jewellery-making-with-a-original-imaguw28pjbm6vjd.jpeg?q=70&crop=false',
                stock: 20
            },
            {
                name: 'Candle Making Supplies',
                description: 'Soy wax, wicks, and fragrances for homemade candles',
                price: 28.40,
                imageUrl: 'https://rukminim2.flixcart.com/image/416/416/kksmikw0/art-craft-kit/e/t/x/candle-making-kit-3-in-1-with-81-item-ikalaa-original-imagy2htg4xghc7g.jpeg?q=70&crop=false',
                stock: 35
            }
        ]);

        // Create orders 
        console.log('Creating orders...');
        const orders = await db.Order.bulkCreate([
            // Completed orders
            {
                userId: users[2].id,
                total: 89.94,
                status: 'Completed',
                shippingAddress: sampleAddresses[0],
                paymentMethod: 'credit_card'
            },
            {
                userId: users[3].id,
                total: 56.45,
                status: 'Completed',
                shippingAddress: sampleAddresses[1],
                paymentMethod: 'paypal'
            },
            {
                userId: users[4].id,
                total: 112.35,
                status: 'Completed',
                shippingAddress: sampleAddresses[2],
                paymentMethod: 'credit_card'
            },
            {
                userId: users[5].id,
                total: 78.20,
                status: 'Completed',
                shippingAddress: sampleAddresses[3],
                paymentMethod: 'cash_on_delivery'
            },

            // Processing orders
            {
                userId: users[6].id,
                total: 64.90,
                status: 'Processing',
                shippingAddress: sampleAddresses[0],
                paymentMethod: 'paypal'
            },
            {
                userId: users[7].id,
                total: 93.75,
                status: 'Processing',
                shippingAddress: sampleAddresses[1],
                paymentMethod: 'credit_card'
            },

            // Pending orders
            {
                userId: users[8].id,
                total: 45.60,
                status: 'Pending',
                shippingAddress: sampleAddresses[2],
                paymentMethod: 'cash_on_delivery'
            },
            {
                userId: users[2].id,
                total: 87.30,
                status: 'Pending',
                shippingAddress: sampleAddresses[3],
                paymentMethod: 'credit_card'
            },
            {
                userId: users[3].id,
                total: 52.15,
                status: 'Pending',
                shippingAddress: sampleAddresses[0],
                paymentMethod: 'paypal'
            }
        ]);

        // Create order items
        console.log('Creating order items...');
        await db.OrderItem.bulkCreate([
            // Order 1 (Rudar Partap Singh)
            { orderId: orders[0].id, productId: products[0].id, quantity: 2, price: products[0].price },
            { orderId: orders[0].id, productId: products[9].id, quantity: 1, price: products[9].price },
            { orderId: orders[0].id, productId: products[12].id, quantity: 1, price: products[12].price },

            // Order 2 (Smarth Sharda)
            { orderId: orders[1].id, productId: products[4].id, quantity: 1, price: products[4].price },
            { orderId: orders[1].id, productId: products[10].id, quantity: 2, price: products[10].price },
            { orderId: orders[1].id, productId: products[2].id, quantity: 1, price: products[2].price },

            // Order 3 (Shaiv Sud)
            { orderId: orders[2].id, productId: products[6].id, quantity: 3, price: products[6].price },
            { orderId: orders[2].id, productId: products[14].id, quantity: 1, price: products[14].price },
            { orderId: orders[2].id, productId: products[17].id, quantity: 2, price: products[17].price },

            // Order 4 (Safal Varadhan)
            { orderId: orders[3].id, productId: products[1].id, quantity: 1, price: products[1].price },
            { orderId: orders[3].id, productId: products[11].id, quantity: 1, price: products[11].price },
            { orderId: orders[3].id, productId: products[13].id, quantity: 1, price: products[13].price },

            // Order 5 (Sachin Kumar Thakur)
            { orderId: orders[4].id, productId: products[5].id, quantity: 1, price: products[5].price },
            { orderId: orders[4].id, productId: products[8].id, quantity: 2, price: products[8].price },
            { orderId: orders[4].id, productId: products[16].id, quantity: 1, price: products[16].price },

            // Order 6 (Rudar Attri)
            { orderId: orders[5].id, productId: products[3].id, quantity: 3, price: products[3].price },
            { orderId: orders[5].id, productId: products[7].id, quantity: 1, price: products[7].price },
            { orderId: orders[5].id, productId: products[15].id, quantity: 1, price: products[15].price },

            // Order 7 (Ishan Tripathi)
            { orderId: orders[6].id, productId: products[0].id, quantity: 1, price: products[0].price },
            { orderId: orders[6].id, productId: products[9].id, quantity: 1, price: products[9].price },

            // Order 8 (Rudar Partap Singh)
            { orderId: orders[7].id, productId: products[2].id, quantity: 1, price: products[2].price },
            { orderId: orders[7].id, productId: products[12].id, quantity: 1, price: products[12].price },
            { orderId: orders[7].id, productId: products[17].id, quantity: 1, price: products[17].price },

            // Order 9 (Smarth Sharda)
            { orderId: orders[8].id, productId: products[4].id, quantity: 1, price: products[4].price },
            { orderId: orders[8].id, productId: products[10].id, quantity: 1, price: products[10].price }
        ]);

        console.log('Database populated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error populating database:', error);
        process.exit(1);
    }
};

// Verify database connection first
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
        populateDatabase();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });