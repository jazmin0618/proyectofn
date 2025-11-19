import { NextResponse } from 'next/server';
import iasData from '@/data/ias.json';

export async function GET() {
  try {
    return NextResponse.json(iasData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al cargar los datos de IAs' },
      { status: 500 }
    );
  }
}