import helmet from 'helmet';
import express from 'express';
import cors from 'cors';


import jobRutes from './api/routes/job.route';
import placementRoutes from './api/routes/placement.route';
import courseRoutes from './api/routes/course.route';
import blogRoutes from './api/routes/blog.route';
import demoClassRoutes from './api/routes/demoClass.route';
import testimonialRoutes from './api/routes/testimonial.route';
import newsRoutes from './api/routes/news.route';
import studentWorkRoutes from './api/routes/studentWork.route';
import uploadRoutes from './api/routes/upload.route';


const app = express();
const DEV_MODE = 'true'

app.use(cors({
    origin: (origin, callback) => {
        if (DEV_MODE || !origin) {
            callback(null, true)
        }
        else {
            callback(new Error('Origin not allowed'))
        }
    },
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());


app.use('/api/courses', courseRoutes);
app.use('/api/jobs', jobRutes);
app.use('/api/placements', placementRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/demo-class', demoClassRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/student-works', studentWorkRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app