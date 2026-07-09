import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 4000;

const AUTH_SERVICE = 'http://localhost:4001';
const STUDENT_SERVICE = 'http://localhost:4002';

// ─── Middleware ───────────────────────────────────────────────────────────────
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'api-gateway',
    timestamp: new Date().toISOString(),
    services: {
      authService: AUTH_SERVICE,
      studentService: STUDENT_SERVICE,
    },
  });
});

// ─── Generic Proxy Helper ─────────────────────────────────────────────────────
async function proxyRequest(
  req: Request,
  res: Response,
  targetBase: string
): Promise<void> {
  const targetUrl = `${targetBase}${req.originalUrl}`;

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }

    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
      signal: AbortSignal.timeout(10000), // 10 detik timeout
    };

    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body && Object.keys(req.body).length > 0) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (err: any) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      console.error(`[Gateway] Timeout proxying to ${targetUrl}`);
      res.status(504).json({ success: false, error: 'Service timeout' });
    } else {
      console.error(`[Gateway] Error proxying to ${targetUrl}:`, err.message);
      res.status(503).json({ success: false, error: 'Service unavailable' });
    }
  }
}

// ─── Proxy Routes ─────────────────────────────────────────────────────────────

// /auth/* → Auth Service (port 4001)
app.all('/auth/*', (req: Request, res: Response) => {
  proxyRequest(req, res, AUTH_SERVICE);
});

// /student/* → Student Service (port 4002)
app.all('/student/*', (req: Request, res: Response) => {
  proxyRequest(req, res, STUDENT_SERVICE);
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found on API Gateway' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 API Gateway running at http://localhost:${PORT}`);
  console.log(`   → /auth/*    → Auth Service    (${AUTH_SERVICE})`);
  console.log(`   → /student/* → Student Service (${STUDENT_SERVICE})`);
  console.log(`   → /health    → Health check\n`);
});
