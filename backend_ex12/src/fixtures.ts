import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User';
import { Photo } from './models/Photo';

dotenv.config();

mongoose.connect(process.env.MONGO_CLIENT_URL || '');
const db = mongoose.connection;

db.once('open', async () => {
    try {
        await db.dropCollection('photos');
        await db.dropCollection('users');
    } catch (err) {
        console.log(err);
    };

    const [userOne, userTwo, userThree] = await User.create({
        username: 'Andychef',
        password: 'Andychef',
    }, {
        username: 'John Doe',
        password: 'John Doe',
    }, {
        username: 'PhotoCrafer',
        password: 'PhotoCrafer',
    });

    await Photo.create({
        title: "Творожная пасха «Любимые вкусы Энди»",
        author: userOne._id,
        image: "andy_1.jpg",
    }, {
        title: "Творожная пасха «Любимые вкусы Энди» в разрезе",
        author: userOne._id,
        image: "andy_2.jpg",
    }, {
        title: "Flowers",
        author: userTwo._id,
        image: "AD_flowers.jpg",
    }, {
        title: "Ласточкино гнездо, Крым 2021",
        author: userThree._id,
        image: "__krym-2021.jpg",
    }, {
        title: "Passerina Cyanea",
        author: userThree._id,
        image: "__passerina_cyanea.jpg",
    });
    
    db.close();
});