import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Tip } from '@/app/models/Tip';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const updatedTip = await Tip.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );
    
    if (!updatedTip) {
      return NextResponse.json(
        { error: 'Tip not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedTip);
  } catch (error) {
    console.error('Error updating tip:', error);
    return NextResponse.json(
      { error: 'Failed to update tip' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const deletedTip = await Tip.findByIdAndDelete(params.id);
    
    if (!deletedTip) {
      return NextResponse.json(
        { error: 'Tip not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Tip deleted successfully' });
  } catch (error) {
    console.error('Error deleting tip:', error);
    return NextResponse.json(
      { error: 'Failed to delete tip' },
      { status: 500 }
    );
  }
} 