import { NextResponse } from 'next/server';
import { buildPortfolioKnowledge } from '@/src/lib/copilot/buildPortfolioKnowledge';

export async function GET() {
  try {
    const data = await buildPortfolioKnowledge();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to build knowledge context.' },
      { status: 500 }
    );
  }
}
