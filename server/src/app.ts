import helmet from 'helmet';
import express from 'express';
import cors from 'cors';


import jobRutes from './routes/job.route';
import placementRoutes from './routes/placement.route';
import courseRoutes from './routes/course.route';
import blogRoutes from './routes/blog.route';
import demoClassRoutes from './routes/demoClass.route';
import testimonialRoutes from './routes/testimonial.route';


const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet());


app.use('/api/courses', courseRoutes);
app.use('/api/jobs', jobRutes);
app.use('/api/placements', placementRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/demo-class', demoClassRoutes);
app.use('/api/testimonials', testimonialRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

export default app