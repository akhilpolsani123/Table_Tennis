import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Tip } from '@/app/models/Tip';

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const tip = await Tip.create(body);
    
    return NextResponse.json(tip, { status: 201 });
  } catch (error) {
    console.error('Error creating tip:', error);
    return NextResponse.json(
      { error: 'Failed to create tip' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();
    console.log('Database connected');
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query = {};
    if (status) {
      query = { status };
    }
    
    console.log('Query:', query);
    
    const tips = await Tip.find(query).sort({ createdAt: -1 });
    console.log('Found tips:', tips.length);
    
    return NextResponse.json(tips);
  } catch (error) {
    console.error('Error fetching tips:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tips' },
      { status: 500 }
    );
  }
} 