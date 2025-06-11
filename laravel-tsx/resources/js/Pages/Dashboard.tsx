import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import { DatePicker } from '@/Components/ui/DatePicker';
import { Notification } from '@/Components/Notification';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

export default function Dashboard({ auth }: PageProps) {
    const [date, setDate] = useState<Date>();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortAsc, setSortAsc] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('Semua');

    const itemsPerPage = 3;

    const data = [
        { name: 'Proyek Analisis Sentimen', status: 'Selesai'},
        { name: 'Proyek Prediksi ANN', status: 'Sedang Berjalan'},
        { name: 'Proyek Feature Engineering', status: 'Tertunda'},
        { name: 'Proyek ETL Pipeline', status: 'Selesai'},
    ];

    const filteredData = data
    .filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => 
        filterStatus === 'Semua' ? true : item.status === filterStatus
    )
    .sort((a, b) =>
      sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusVariant = (status: string) => {
        switch (status) {
        case 'Selesai':
            return 'default';
        case 'Sedang Berjalan':
            return 'secondary';
        case 'Tertunda':
            return 'destructive';
        default:
            return 'outline';
        }
    };

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const toggleShort = () => setSortAsc(prev => !prev);

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 space-y-6">
                        
                            <Notification
                                    type="success"
                                    title="Berhasil Login"
                                    message="Selamat datang di dashboard."
                            />

                            <div>
                                <h2 className="text-lg mb-2 font-medium">Pilih Tanggal:</h2>
                                <DatePicker date={date} setDate={setDate} />
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 mt-6 items-start md:items-end justify-between">
                                <div className="flex flex-col space-y-2">
                                    <label className="text-sm font-medium">Cari Nama Proyek</label>
                                    <Input
                                        placeholder="Cari..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                        }}
                                        className="w-[250px]"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label className="text-sm font-medium">Filter Status</label>
                                    <Select
                                        value={filterStatus}
                                        onValueChange={(value) => {
                                        setFilterStatus(value);
                                        setCurrentPage(1);
                                        }}
                                    >
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder="Semua" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Semua">Semua</SelectItem>
                                            <SelectItem value="Selesai">Selesai</SelectItem>
                                            <SelectItem value="Sedang Berjalan">Sedang Berjalan</SelectItem>
                                            <SelectItem value="Tertunda">Tertunda</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className='flex justify-between mt-4'>
                                <h2 className="text-lg font-medium">Status Proyek:</h2>
                                <Button variant="outline" onClick={toggleShort}>
                                    Urutkan Nama ({sortAsc ? 'A-Z' : 'Z-A'})
                                </Button>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Proyek</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>
                                                    <Badge variant={getStatusVariant(item.status)}>
                                                        {item.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={2} className='text-center'>
                                                Data tidak ditemukan.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                            {/* Pagination Control */}
                            <div className='flex justify-between items-center pt-4'>
                                <Button 
                                    variant="outline"
                                    onClick={handlePrev}
                                    disabled={currentPage === 1}
                                >
                                    Sebelumnya
                                </Button>
                                <span className='text-sm text-gray-600'>
                                    Halaman {currentPage} dari {totalPages || 1}
                                </span>
                                <Button
                                    variant="outline"
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                >
                                    Selanjutnya
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
